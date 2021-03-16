const popups = document.querySelectorAll('[data-popup]');

popups.forEach((popup) => {
  const root = document.documentElement;

  const check = (e) => {
    const content = popup.nextElementSibling;

    if (!popup.contains(e.target) && !content.contains(e.target)) {
      root.removeEventListener('click', check);
      popup.setAttribute('aria-expanded', 'false');
    }
  };

  popup.addEventListener('click', () => {
    if (popup.getAttribute('aria-expanded') === 'true') {
      root.removeEventListener('click', check);
      popup.setAttribute('aria-expanded', 'false');
    } else {
      root.addEventListener('click', check);
      popup.setAttribute('aria-expanded', 'true');
    }
  });
});
