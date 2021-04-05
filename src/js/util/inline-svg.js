export default (img, cls = '') => {
  // eslint-disable-next-line
  const svg = require(`../../img/${img}.svg`);
  return `<span class="svg svg--${img} ${cls}">${svg}</span>`;
};
