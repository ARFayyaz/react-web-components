import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import replace from '@rollup/plugin-replace';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/web-components/index.ts'),
      name: 'ReactWebComponents',
      fileName: (format) => `react-web-components.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true,
        }),
      ],
    },
  },
});
