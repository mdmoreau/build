import { defineConfig } from 'astro/config';
import nesting from 'postcss-nesting';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: 'assets/script.js',
        }
      }
    },
    css: {
      postcss: {
        plugins: [nesting()]
      }
    }
  }
});
