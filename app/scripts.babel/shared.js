'use strict';
const COUNT_VARIABLE_NAME = 'streakCount';
const MODE_VARIABLE_NAME = 'mode';
const MODE = {
  AUTOMATIC: 'AUTOMATIC',
  MANUAL: 'MANUAL',
};
const shared = {
  set(variableName, value) {
    const obj = { [variableName]: value };
    return new Promise(res => {
      chrome.storage.sync.set(obj, () => res(obj));
    })
  },

  get(variableName, defaultValue) {
    return new Promise(res => 
      chrome.storage.sync.get(variableName, data => res(data[variableName] || defaultValue))
    )
  },

  refreshBadge() {
    return shared.get(COUNT_VARIABLE_NAME, 0).then(shared.setBadge);
  },

  setBadge(count = 0) {
    chrome.browserAction.setBadgeText({ text: `${ count }` });
    return Promise.resolve(count);
  },


  setCount(streakCount) {
     return shared.set(COUNT_VARIABLE_NAME, streakCount).then(shared.refreshBadge);
  },

  resetCount: () => shared.setCount(0),

  getCount() {
    return shared.get(COUNT_VARIABLE_NAME, 0);
  },

  incrementCount() {
    return shared.getCount().then(count => shared.setCount(count + 1));
  },

  getMode(callback) {
    return shared.get(MODE_VARIABLE_NAME, MODE.MANUAL);
  },

  setMode(mode) {
    return shared.set(MODE_VARIABLE_NAME, mode);
  },

  toggleMode() {
    return shared.getMode().then(mode => {
      let newMode;
      switch (mode) {
      case MODE.AUTOMATIC:
        newMode = MODE.MANUAL;
        break;
      case MODE.MANUAL:
        newMode = MODE.AUTOMATIC;
        break;
      default:
        newMode = MODE.MANUAL;
        break;
      }

      shared.setMode(newMode);
    });
  }
};
