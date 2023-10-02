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
    
    VitePWA(
      { 
        manifest: {
          icons: [
            {
              src: "/icons/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => {
                return url.pathname.startsWith("/api");
              },
              handler: "CacheFirst" as const,
              options: {
                cacheName: "api-cache",
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      })


  ],
  
  server: {
    host: true,
  },
});