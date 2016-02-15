'use strict';
const COUNT_VARIABLE_NAME = 'streakCount';
const MODE_VARIABLE_NAME = 'mode';
const MODE = {
  AUTOMATIC: 'AUTOMATIC',
  MANUAL: 'MANUAL',
};
const shared = {
  refreshBadge() {
    chrome.storage.sync.get(COUNT_VARIABLE_NAME, shared.setBadge);
  },

  setBadge({ streakCount = 0 }) {
    chrome.browserAction.setBadgeText({ text: `${ streakCount }` });
  },

  set(variableName, value, callback) {
    const obj = { [variableName]: value };
    chrome.storage.sync.set(obj, callback);
  },

  get(variableName, callback, { defaultValue }) {
    chrome.storage.sync.get(variableName, data => callback(data[variableName] || defaultValue));
  },

  setCount(streakCount) {
    shared.set(COUNT_VARIABLE_NAME,
               streakCount,
               shared.refreshBadge);
  },


  getCount(callback) {
    shared.get(COUNT_VARIABLE_NAME, callback, {
      defaultValue: 0
    });
  },

  incrementCount() {
    shared.getCount(count =>
      shared.setCount(count + 1)
    );
  },

  getMode(callback) {
    shared.get(MODE_VARIABLE_NAME, callback, {
      defaultValue: MODE.MANUAL
    });
  },

  setMode(mode) {
    shared.set(MODE_VARIABLE_NAME, mode);
  }


};
