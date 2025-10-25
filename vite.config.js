/**
 * Vite Configuration File
 *
 * Sets up Vite for this project, including the React plugin for JSX/TSX support.
 * Necessary for proper development server, build process, and React features.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
