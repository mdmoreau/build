import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    {
      name: 'bundle',
      hooks: {
        'astro:build:done': (options) => {
          const { pathname } = options.dir;
          const html = fs.globSync(path.join(pathname, '*.html'));
          const scripts = fs.globSync(path.join(pathname, 'assets/script[0-9]*.js'));
          const chunksDir = path.join(pathname, 'chunks');
          for (const file of html) {
            let data = fs.readFileSync(file, 'utf8');
            data = data.replace(/<script type="module" src=".*\/assets\/script\d+\.js"><\/script>/, '');
            fs.writeFileSync(file, data);
          }
          for (const script of scripts) {
            fs.rmSync(script);
          }
          fs.rmSync(chunksDir, { recursive: true });
        }
      }
    }
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: 'assets/script.js',
          manualChunks: () => 'bundle',
        }
      }
    },
    css: {
      transformer: 'lightningcss',
    }
  }
});
