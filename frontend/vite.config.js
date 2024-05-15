import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure it listens on all network interfaces
    port: 3000,       // Set the server port to 8080
    strictPort: true, // Ensures Vite will only start if port 8080 is available
  },
});
