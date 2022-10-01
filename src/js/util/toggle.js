const toggles = document.querySelectorAll('[data-toggle]');

toggles.forEach((toggle) => {
  const type = toggle.getAttribute('data-toggle');
  const parent = toggle.closest('[data-toggle-group]');
  const ancestors = parent?.querySelectorAll('[data-toggle="group"]');
  const children = [...ancestors ?? []].filter((item) => item.closest('[data-toggle-group]') === parent);

  if (!toggle.hasAttribute('aria-expanded')) {
    toggle.setAttribute('aria-expanded', false);
  }

  toggle.addEventListener('click', () => {
    let expanded = toggle.getAttribute('aria-expanded') === 'true';

    switch (type) {
      case 'group':
        children.forEach((child) => {
          expanded = child === toggle;
          child.setAttribute('aria-expanded', expanded);
        });
        break;

      default:
        toggle.setAttribute('aria-expanded', !expanded);
        break;
    }
  });
});
