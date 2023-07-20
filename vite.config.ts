import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: "happy-dom",
   
  },
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