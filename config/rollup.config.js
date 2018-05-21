import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const globby = require('globby');

const configs = globby.sync('src/js/*.js').map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace('src', 'dist').replace('.js', '.min.js'),
    format: 'iife',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          modules: false,
          useBuiltIns: 'usage',
        }],
      ],
    }),
    uglify(),
  ],
  watch: {
    chokidar: false,
    clearScreen: false,
  },
}));

module.exports = configs;
