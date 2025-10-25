/**
 * Tailwind CSS Configuration File
 *
 * This file is used to configure Tailwind CSS for your project.
 *
 * - `content`: Specifies all the files Tailwind should scan for class names.
 *   Here, it looks in `index.html` and all JS/TS/JSX/TSX files in `src`.
 * - `theme`: Customize the default Tailwind theme. `extend` allows adding
 *   custom values without replacing the defaults.
 * - `plugins`: Add Tailwind CSS plugins here if needed.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
