const targets = document.querySelectorAll('[data-expand]');

targets.forEach((target) => {
  const type = target.getAttribute('data-expand');
  const expanded = () => target.getAttribute('aria-expanded') === 'true';

  if (!target.hasAttribute('aria-expanded')) {
    target.setAttribute('aria-expanded', false);
  }

  if (!type) {
    target.addEventListener('click', () => {
      target.setAttribute('aria-expanded', !expanded());
    });
  }

  if (type === 'group') {
    const root = target.closest('[data-expand-group]');
    const items = root.querySelectorAll('[data-expand="group"]');
    const group = [...items].filter((item) => item.closest('[data-expand-group]') === root);
    target.addEventListener('click', () => {
      group.forEach((item) => {
        item.setAttribute('aria-expanded', item === target);
      });
    });
  }

  if (type === 'popup') {
    const next = target.nextElementSibling;
    target.addEventListener('click', () => {
      target.setAttribute('aria-expanded', !expanded());
    });
    document.addEventListener('click', (e) => {
      if (expanded() && !target.contains(e.target) && !next.contains(e.target)) {
        target.setAttribute('aria-expanded', false);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (expanded() && e.key === 'Escape') {
        target.setAttribute('aria-expanded', false);
      }
    });
  }
});
