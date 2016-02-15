'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

function refreshBadge() {
  chrome.storage.sync.get('streakCount', setBadge);
}

function setBadge({ streakCount = 0 }) {
  chrome.browserAction.setBadgeText({ text: `${ streakCount }` });
}

function incrementCount() {
  chrome.storage.sync.get('streakCount', countHandler);
}

function countHandler({ streakCount = 0 }) {
  chrome.storage.sync.set({ streakCount: streakCount + 1 }, refreshBadge);
}

chrome.browserAction.onClicked.addListener(incrementCount);
refreshBadge();
