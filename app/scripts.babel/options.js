'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setCountDOMLogic();
  automaticModeDOMLogic();

});

function setCountDOMLogic() {
  const storeCountButton = document.getElementById('store-count');
  const countInput = document.getElementById('count');
  shared.getCount().then(count => countInput.value = count); 
  storeCountButton.addEventListener('click', () => {
    const newCount = parseInt(countInput.value, 10);
    shared.setCount(newCount);
  });
}

function automaticModeDOMLogic() {
  const checkbox = document.getElementById('automatic');
  shared.getMode().then(mode => {
    checkbox.checked = mode === MODE.AUTOMATIC;
  });

  checkbox.addEventListener('change', () => {
    shared.toggleMode();
  });  
}
