'use strict';
const shared = {
  refreshBadge() {
    chrome.storage.sync.get('streakCount', shared.setBadge);
  },

  setBadge({ streakCount = 0 }) {
    chrome.browserAction.setBadgeText({ text: `${ streakCount }` });
  },

  setCount(streakCount = 0) {
    chrome.storage.sync.set({ streakCount }, shared.refreshBadge);
  },

  incrementCount() {
    chrome.storage.sync.get('streakCount', ({ streakCount = 0 }) =>
      shared.setCount(streakCount)
    );
  }
};
