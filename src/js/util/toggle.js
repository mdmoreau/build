const toggles = document.querySelectorAll('[data-toggle]');

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});
