const toggles = document.querySelectorAll('[data-toggle]');

toggles.forEach((toggle) => {
  const type = toggle.getAttribute('data-toggle');
  const root = toggle.closest('[data-toggle-group]');
  const items = root?.querySelectorAll('[data-toggle="group"]');
  const group = [...items ?? []].filter((item) => item.closest('[data-toggle-group]') === root);

  if (!toggle.hasAttribute('aria-expanded')) {
    toggle.setAttribute('aria-expanded', false);
  }

  toggle.addEventListener('click', () => {
    let expanded = toggle.getAttribute('aria-expanded') === 'true';

    switch (type) {
      case 'group':
        group.forEach((item) => {
          expanded = item === toggle;
          item.setAttribute('aria-expanded', expanded);
        });
        break;

      default:
        toggle.setAttribute('aria-expanded', !expanded);
        break;
    }
  });
});
