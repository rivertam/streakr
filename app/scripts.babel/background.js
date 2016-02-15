'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(shared.incrementCount);
shared.refreshBadge();
