const targets = document.querySelectorAll('[data-expand]');

targets.forEach((target) => {
  const type = target.getAttribute('data-expand');
  const root = target.closest('[data-expand-group]');
  const items = root?.querySelectorAll('[data-expand="group"]');
  const group = [...items ?? []].filter((item) => item.closest('[data-expand-group]') === root);

  if (!target.hasAttribute('aria-expanded')) {
    target.setAttribute('aria-expanded', false);
  }

  target.addEventListener('click', () => {
    let expanded = target.getAttribute('aria-expanded') === 'true';

    switch (type) {
      case 'group':
        group.forEach((item) => {
          expanded = item === target;
          item.setAttribute('aria-expanded', expanded);
        });
        break;

      default:
        target.setAttribute('aria-expanded', !expanded);
        break;
    }
  });
});
