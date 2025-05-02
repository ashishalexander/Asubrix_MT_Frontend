import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-spa-redirect',
      closeBundle() {
        // Create _redirects file for Render/Netlify
        writeFileSync('./dist/_redirects', '/* /index.html 200');
        
        // Create a rewrite rule file for Render
        writeFileSync('./dist/200.html', '<script>window.location.pathname = "/" + window.location.href.split("/").slice(3).join("/");</script>');
      }
    }
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,  
      },
    },
  },
});