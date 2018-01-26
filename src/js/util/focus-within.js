((window, document) => {
  const removeClass = function removeClass(elem) {
    elem.classList.remove('focus-within');
  };
  const update = (() => {
    let running;
    let last;
    const action = function action() {
      let element = document.activeElement;
      running = false;
      if (last !== element) {
        last = element;
        [...document.querySelectorAll('.focus-within')].forEach(removeClass);
        while (element && element.classList) {
          element.classList.add('focus-within');
          element = element.parentNode;
        }
      }
    };
    return () => {
      if (!running) {
        requestAnimationFrame(action);
        running = true;
      }
    };
  })();
  document.addEventListener('focus', update, true);
  document.addEventListener('blur', update, true);
  update();
})(window, document);
