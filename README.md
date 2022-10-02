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

## Static Files
- The contents of `src/static` will be copied to the build root
- Store images within `src/static/img` to have them available to build process tools

## Twig
- Store partials within `src/html/layouts` and `src/html/components`
- Inline an SVG using `name` as the filename without extension: `{{ inline_svg('name') }}`

## PostCSS
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-preset-env](https://preset-env.cssdb.org/)

## Babel
- [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [babel-preset-react](https://babeljs.io/docs/en/babel-preset-react)

## stylelint
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

## ESLint
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
