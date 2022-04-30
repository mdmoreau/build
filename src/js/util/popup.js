const popups = document.querySelectorAll('[data-popup]');

popups.forEach((popup) => {
  const root = document.documentElement;

  let add = () => {};
  let remove = () => {};

  const getFocusable = () => {
    const all = popup.nextElementSibling.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
    const visible = [...all].filter((el) => !!(
      el.offsetWidth
      || el.offsetHeight
      || el.getClientRects().length
    ));
    return visible;
  };

  const focusTrap = (e) => {
    const focusable = getFocusable();
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && popup === document.activeElement) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && last === document.activeElement) {
      e.preventDefault();
      popup.focus();
    }
  };

  const handleKeydown = (e) => {
    if (e.keyCode === 9) {
      focusTrap(e);
    } else if (e.keyCode === 27) {
      remove();
    }
  };

  const handleClick = (e) => {
    const content = popup.nextElementSibling;
    if (!popup.contains(e.target) && !content.contains(e.target)) {
      remove();
    }
  };

  add = () => {
    root.addEventListener('click', handleClick);
    root.addEventListener('keydown', handleKeydown);
    popup.setAttribute('aria-expanded', 'true');
  };

  remove = () => {
    root.removeEventListener('click', handleClick);
    root.removeEventListener('keydown', handleKeydown);
    popup.setAttribute('aria-expanded', 'false');
  };

  popup.addEventListener('click', () => {
    if (popup.getAttribute('aria-expanded') === 'true') {
      remove();
    } else {
      add();
    }
  });
});
