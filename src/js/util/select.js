const selects = document.querySelectorAll('[data-select]');

selects.forEach((select) => {
  const items = select.querySelectorAll('[data-select-item]');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((el) => {
        if (el === item) {
          el.setAttribute('aria-expanded', 'true');
        } else {
          el.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  if (!select.querySelectorAll('[data-select-item][aria-expanded="true"]').length) {
    items[0].click();
  }
});
