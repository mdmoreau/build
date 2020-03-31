export default function (img, cls) {
  const classList = typeof cls === 'string' ? cls : '';
  const svg = require(`../../img/${img}.svg`); // eslint-disable-line
  return `<span class="svg svg--${img} ${classList}">${svg}</span>`;
}
