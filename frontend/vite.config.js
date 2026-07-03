import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración base de Vite para React.
// El servidor de desarrollo corre por defecto en http://localhost:5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
