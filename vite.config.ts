import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa'

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
    VitePWA({ registerType: 'autoUpdate' })
  ],
  server: {
    host: true,
  },
});