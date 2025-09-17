const vimiumBlankNewTabUrl = "https://vimium.github.io/new-tab/";
const settings = await chrome.storage.sync.get(null);
const isCustom = settings.destinationType == "custom" && settings.customUrl?.length > 0;
let url;
if (isCustom) {
  url = settings.customUrl;
} else {
  url = vimiumBlankNewTabUrl;
}

document.location.href = url;

// If a custom URL is used and it's a file:// URL, consider using chrome.tabs.update in Chrome, so
// that the redirection works; otherwise it will fail with a security error. However, with this
// method, the keyboard focus will remain in Chrome's URL bar, rather than on the page. Second, this
// only works in Chrome; Firefox prevents using chrome.tabs.update to load a file:// URL. See
// https://github.com/philc/vimium/issues/4741.
//
// const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
// const tab = tabs[0];
// await chrome.tabs.update(tab.id, { url });
