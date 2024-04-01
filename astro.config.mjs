import { defineConfig } from 'astro/config';

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
          entryFileNames: 'assets/script.js',
          assetFileNames: 'assets/[name][extname]',
        }
      }
    },
    css: {
      transformer: 'lightningcss',
    }
  }
});
