'use strict';

document.addEventListener('DOMContentLoaded', () => {
  modeSelectDOMLogic();
  automaticModeDOMLogic();
  manualModeDOMLogic();
  showModeOptions();
});

function manualModeDOMLogic() {
  const storeCountButton = document.getElementById('store-count');
  const countInput = document.getElementById('count');

  storeCountButton.addEventListener('click', () => {
    const newCount = parseInt(countInput.value, 10);
    shared.setCount(newCount);
  });
}

function modeSelectDOMLogic() {
  const checkbox = document.getElementById('automatic');
  shared.getMode().then(mode => {
    checkbox.checked = mode === MODE.AUTOMATIC;
  });

  checkbox.addEventListener('change', e => {
    shared.toggleMode().then(showModeOptions);
  }); 
}

function automaticModeDOMLogic() {
  const datePicker = document.getElementById('start-date');

  datePicker.addEventListener('change', () => {
    const newStartDate = Date.parse(datePicker.value);
    shared.setStartDate(new Date(newStartDate));
  });
}

function populateFields() {
  const datePicker = document.getElementById('start-date');
  shared.getStartDate().then(d => datePicker.value = shared.formatDate(d));

  const countInput = document.getElementById('count');
  shared.getCount().then(count => countInput.value = count);
}

function showModeOptions() {
  const automaticOptions = document.getElementById('automatic-options');
  const manualOptions = document.getElementById('manual-options');
  shared.getMode().then(mode => {
    switch (mode) {
    case MODE.AUTOMATIC:
      automaticOptions.style.display = 'block';
      manualOptions.style.display = 'none';
      break;
    case MODE.MANUAL:
      automaticOptions.style.display = 'none';
      manualOptions.style.display = 'block';
      break;
    }
  });

  populateFields();
}
