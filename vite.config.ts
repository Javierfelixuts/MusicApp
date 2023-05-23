import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // your compiler options here
          // for example, to enable whitespace preservation:
          whitespace: 'condense',
        },
      },
    }),
  ],
  server: {
    host: true,
  },
});