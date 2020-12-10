## Requirements
- [Node.js](https://nodejs.org/)

## Features
- [Twig](https://twig.symfony.com/)
- [PostCSS](https://postcss.org/)
- [Babel](https://babeljs.io/)
- [stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)

## Build Process

### Initial Setup
- Install build process dependencies by running `npm ci` from the project root

### Development
- Watch files and rebuild on change by running `npm run dev` from the project root
- Launches a local server that automatically reloads connected browsers

### Production
- Create an optimized build by running `npm run build` from the project root
- Run before deploying to a production environment

## Twig
- Store partials within `src/html/layouts` and `src/html/components`

## PostCSS
- [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables)
- [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)
- [postcss-preset-env](https://preset-env.cssdb.org/)

## Babel
- [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [babel-preset-react](https://babeljs.io/docs/en/babel-preset-react)

## stylelint
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

## ESLint
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

## Images
- Store images within `src/img` to have them optimized and available to build process tools

## Inline SVG
- Write the contents of an SVG inline using `icon` as the filename without extension and `class` as an optional class attribute value on the container

### Twig
- Inline the SVG directly

```twig
{{ inline_svg('icon', 'class') }}
```

### JavaScript
- Store the SVG as a string

```javascript
import inlineSVG from '../util/inline-svg';

const svg = inlineSVG('icon', 'class');
```

### CSS
- Add new styles to `src/css/util/helpers.css` if SVG aspect ratio doesn't match the default of 1:1

```css
.svg--icon {
  &::before {
    padding-top: 50%; /* 2:1 aspect ratio */
  }
}
```
