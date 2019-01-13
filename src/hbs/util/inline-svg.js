const fs = require('fs');

module.exports = (img, cls) => {
  const classList = typeof cls === 'string' ? cls : '';
  const svg = fs.readFileSync(`./img/${img}.svg`, 'utf8');
  return `<span class="svg svg--${img} ${classList}">${svg}</span>`;
};
