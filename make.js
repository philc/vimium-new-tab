#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-run
// Usage: ./make.js command. Use -l to list commands.
// This is a set of tasks for packaging this extension.

import * as fs from "@std/fs";
import * as path from "@std/path";
import * as drake from "https://deno.land/x/drake@v1.5.1/mod.ts";

const projectPath = new URL(".", import.meta.url).pathname;

async function shell(procName, argsArray = []) {
  // NOTE(philc): Does drake's `sh` function work on Windows? If so, that can replace this function.
  if (Deno.build.os == "windows") {
    // if win32, prefix arguments with "/c {original command}"
    // e.g. "mkdir c:\git\vimium-new-tab" becomes "cmd.exe /c mkdir c:\git\vimium-new-tab"
    optArray.unshift("/c", procName);
    procName = "cmd.exe";
  }
  const p = Deno.run({ cmd: [procName].concat(argsArray) });
  const status = await p.status();
  if (!status.success) {
    throw new Error(`${procName} ${argsArray} exited with status ${status.code}`);
  }
}

async function parseManifestFile() {
  // Chrome's manifest.json supports JavaScript comment syntax. However, the Chrome Store rejects
  // manifests with JavaScript comments in them! So here we use the JSON5 library, rather than JSON
  // library, to parse our manifest.json and remove its comments.
  return JSON.parse(await Deno.readTextFile("./manifest.json"));
}

// Builds a zip file for submission to the Chrome and Firefox stores. The output is in dist/.
async function buildStorePackage() {
  const chromeManifest = await parseManifestFile();
  const version = chromeManifest["version"];

  const excludeList = [
    "*.md",
    ".*",
    "MIT-LICENSE.txt",
    "dist",
    "make.js",
    "deno.json",
    "deno.lock",
  ];

  // const manifest = await parseManifestFile();
  const rsyncOptions = ["-r", ".", "dist/vimium-new-tab"].concat(
    ...excludeList.map((item) => ["--exclude", item]),
  );

  // cd into "dist/vimium-new-tab" before building the zip, so that the files in the zip don't each
  // have the path prefix "dist/vimium-new-tab".
  // --filesync ensures that files in the archive which are no longer on disk are deleted. It's
  // equivalent to removing the zip file before the build.
  const zipCommand = "cd dist/vimium-new-tab && zip -r --filesync ";

  await shell("rm", ["-rf", "dist/vimium-new-tab"]);
  await shell("mkdir", [
    "-p",
    "dist/vimium-new-tab",
    "dist/chrome-store",
  ]);
  await shell("rsync", rsyncOptions);

  await shell("bash", [
    "-c",
    `${zipCommand} ../chrome-store/vimium-new-tab-chrome-store-${version}.zip .`,
  ]);
}

drake.desc("Builds a zip file for submission to the Chrome and Firefox stores. The output is in dist/");
drake.task("package", [], async () => {
  await buildStorePackage();
});

drake.run();
