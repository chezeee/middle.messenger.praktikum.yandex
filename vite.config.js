import { resolve } from 'path';
import { defineConfig } from 'vite';

/* eslint-disable */
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  // assetsInclude: ['**/*.hbs'],
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, './public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
      },
    },
    target: 'es2022',
  },
  esbuild: {
    target: 'es2022',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src'),
    }),
    tsconfigPaths({
      loose: true,
      root: './',
    }),
  ],
});
