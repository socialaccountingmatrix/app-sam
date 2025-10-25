/**
 * PostCSS Configuration File
 *
 * This file configures PostCSS plugins for your project.
 *
 * - `@tailwindcss/postcss`: Enables Tailwind CSS to process your CSS.
 * - `autoprefixer`: Automatically adds vendor prefixes for better browser support.
 *
 * Each plugin is configured as an object. Additional plugin options can be added if needed.
 */

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
