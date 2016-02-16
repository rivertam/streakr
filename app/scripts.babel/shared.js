'use strict';
const COUNT_VARNAME = 'streakCount';
const MODE_VARNAME = 'mode';
const START_DATE_VARNAME = 'startDate';
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
      chrome.storage.sync.get(variableName, data => {
        const val = data[variableName];
        if (!val) {
          shared
            .set(variableName, defaultValue)
            .then(() => res(defaultValue));
        }

        res(val);
      })
    );
  },

  refreshBadge() {
    return shared.getCount().then(shared.setBadge);
  },

  setBadge(count = 0) {
    chrome.browserAction.setBadgeText({ text: `${ count }` });
    return Promise.resolve(count);
  },

  setCount(streakCount) {
     return shared.set(COUNT_VARNAME, streakCount).then(shared.refreshBadge);
  },

  resetStreak() {
    const message = `WARNING: You are about to reset your streak.
    Are you sure this is what you want to do?\n(You're receiving this
    message because you're in automatic mode; switch to manual mode
    in the options menu if you want to use this button to increment
    your badge)`;

    if (window.confirm(message)) {
      shared.setStartDate(new Date());
    }
  },

  getCount() {
    return shared.getMode().then(mode => {
      switch(mode) {
      case MODE.AUTOMATIC:
        return shared
          .getStartDate()
          .then(date => {
            const difference = (new Date()) - date;
            return Math.floor(difference / (1000 * 3600 * 24));
          });
      case MODE.MANUAL:
        return shared.get(COUNT_VARNAME, 0);
      }
    });
  },

  setStartDate(date) {
    const d = new Date(date);
    return shared.set(START_DATE_VARNAME, `${ d.valueOf() }`)
      .then(shared.refreshBadge);
  },

  getStartDate() {
    return shared.get(START_DATE_VARNAME,
                      (new Date).valueOf())
      .then(time => new Date(parseInt(time)));
  },

  incrementCount() {
    return shared.getCount().then(count => shared.setCount(count + 1));
  },

  getMode(callback) {
    return shared.get(MODE_VARNAME, MODE.AUTOMATIC);
  },

  setMode(mode) {
    return shared.set(MODE_VARNAME, mode);
  },

  switchToAutomatic() {
    return shared.getCount().then(count => {
        const newTime = (new Date()) - (count * 24 * 60 * 60 * 1000);
        const newDate = Date.parse(shared.formatDate(new Date(newTime)));
        return shared.setStartDate(newDate);
      }).then(() => shared.setMode(MODE.AUTOMATIC));
  },

  formatDate(d) {
    return d.toISOString().slice(0, 10);
  },

  switchToManual() {
    return shared.getCount()
      .then(shared.setCount)
      .then(() => shared.setMode(MODE.MANUAL));
  },

  toggleMode() {
    return shared.getMode().then(mode => {
      switch (mode) {
      case MODE.MANUAL:
        return shared.switchToAutomatic();
      case MODE.AUTOMATIC:
      default:
        return shared.switchToManual();
      }
    });
  }
};
