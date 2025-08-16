// TODO(philc): Fetch this URL from settings.
// let url = chrome.runtime.getURL("new_tab.html");
let url = "https://vimium.github.io/new-tab/";
const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
const tab = tabs[0];

document.location.href = url;

// When the URL is a file, consider doing this approach in Chrome so the redirection works.
// However, this won't work in Firefox.
// await chrome.tabs.update(tab.id, { url });
