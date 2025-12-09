import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cache: false, // Disable caching for development
    proxy: {
      '/api/ecomm-webhook': {
        target: 'https://n8n-excollo.azurewebsites.net/webhook/31344f1e-117a-4839-bfd0-a6c31aacf593',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ecomm-webhook/, ''),
        secure: true,
      },
      '/api/seo-webhook': {
        target: 'https://n8n-excollo.azurewebsites.net/webhook/f0e8b760-7674-4021-9c53-e0c56acb5351',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/seo-webhook/, ''),
        secure: true,
      },
      '/api/seo-feedback': {
        target: 'https://n8n-excollo.azurewebsites.net/webhook/528aa770-e351-4ae0-9626-38b398e40487',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/seo-feedback/, ''),
        secure: true,
      },
      '/api/webhook': {
        target: 'https://n8n-excollo.azurewebsites.net/webhook/d4c39176-8d30-491c-88ed-9be5a1d55a0e',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, ''),
        secure: true,
      }
    }
  },
  optimizeDeps: {
    include: [
      "three/examples/jsm/loaders/FontLoader",
      "three/examples/jsm/geometries/TextGeometry",
    ],
  },
});
