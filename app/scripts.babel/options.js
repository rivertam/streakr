'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const storeCountButton = document.getElementById('store-count');
  const countInput = document.getElementById('count');
  storeCountButton.addEventListener('click', () => {
    const newCount = parseInt(countInput.value, 10);
    shared.setCount(newCount);
  });
});
