'use strict';

function click() {
  shared.getMode().then(mode => {
    switch (mode) {
    case MODE.MANUAL:
      shared.incrementCount();
      break;
    case MODE.AUTOMATIC:
      shared.resetStreak();
      break;
    }
  });
}

chrome.browserAction.onClicked.addListener(click);
shared.refreshBadge();
// update badge once every 5 minutes (it's practically free tbh)
window.setInterval(shared.refreshBadge, 1000 * 60 * 5);
