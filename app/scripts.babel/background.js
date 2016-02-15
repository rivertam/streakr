'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

function click() {
  shared.getMode().then(mode => {
    switch (mode) {
    case MODE.MANUAL:
      shared.incrementCount();
      break;
    case MODE.AUTOMATIC:
      shared.resetCount();
      break;
    }
  });
}

chrome.browserAction.onClicked.addListener(shared.incrementCount);
shared.refreshBadge();
