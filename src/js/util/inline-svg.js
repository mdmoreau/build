export default (img, cls = '') => {
  const svg = require(`../../img/${img}.svg`); // eslint-disable-line
  return `<span class="svg svg--${img} ${cls}">${svg}</span>`;
};
