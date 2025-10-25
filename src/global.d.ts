// src/global.d.ts

/**
 * 🧩 Purpose:
 * This file provides **type declarations** for non-TypeScript modules
 * (like `.css` and `.svg` files) so the TypeScript compiler
 * understands what they represent when imported in the project.
 *
 * Without this file, TypeScript would throw errors such as:
 *   - "Cannot find module './App.css'"
 *   - "Cannot find module './logo.svg'"
 *
 * because by default, TypeScript only knows how to type-check `.ts` / `.tsx` files,
 * not static assets or style files.
 *
 * Putting these declarations in a `global.d.ts` file makes them
 * globally available throughout the project — you don't need to import it anywhere.
 */

// ✅ CSS Module Declaration
// When importing CSS (e.g., import styles from './App.css'),
// TypeScript will now understand that it’s an object mapping class names to strings.
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// ✅ SVG Module Declaration
// Supports both usage styles:
//   1. As a React component:  import { ReactComponent as Logo } from './logo.svg';
//   2. As a file path:        import logo from './logo.svg';
//
// This avoids "Cannot find module '*.svg'" or type mismatch errors
// in React + Vite + TypeScript projects.
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
