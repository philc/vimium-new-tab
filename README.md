# Vimium New Tab Page

This is designed to be used as a companion extension to [Vimium](https://github.com/philc/vimium).

This browser extension opens new tabs using Vimium's blank new tab page. As a result, the browser's
new tab page will retain keyboard focus and Vimium commands can be used immediately. This new tab
page works offline.

If desired, the URL for the new tab page can be configured in this extension's options page.

## How to install

- Chrome:
  [Chrome web store](https://chromewebstore.google.com/detail/vimium-new-tab-page/leohhkagdnmgbpfbnflhjmnpcjpcjmgm)
- Edge:
  [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/vimium-new-tab-page/ahmddkokfhbdbmlioknpkipoikcckpah)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/vimium-new-tab-page/)

This extension registers itself as the handler for new tabs. After installing the extension, the
first time a new tab page is opened, the browser will prompt you to confirm that you want this
extension to handle new tabs.

### Limitations

* In Chromium browsers like Chrome and Edge, the keyboard focus of new tabs will be in the page, not
  in the browser's URL bar, which is desirable for this use case. However, in Firefox, focus will be
  in the URL bar; you must hit the escape key once to move the focus to the page. See
  [here](https://github.com/philc/vimium/issues/4741) for more technical details.
