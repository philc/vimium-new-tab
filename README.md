# Vimium New Tab Page

This is designed to be used as a companion extension to [Vimium](https://github.com/philc/vimium).

This browser extension opens new tabs using Vimium's blank new tab page. As a result, the browser's
new tab page will retain keyboard focus in Chrome-based browsers, and Vimium commands can be used
immediately. This new tab page works offline.

If desired, the URL for the new tab page can be configured in this extension's options page.

### Limitations

* In Chromium browsers like Chrome and Edge, the keyboard focus of new tabs will be in the page, not
  in the browser's URL bar, which is desirable for this use case. However, in Firefox, focus will be
  in the URL bar; you must hit the escape key once to move the focus to the page. See
  [here](https://github.com/philc/vimium/issues/4741) for more technical details.
