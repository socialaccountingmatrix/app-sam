/**
 * ESLint Configuration File
 *
 * This file sets up ESLint for the project to ensure consistent code quality,
 * style, and error checking for both JavaScript and TypeScript files. ESLint
 * is a widely-used linter that helps catch errors early, enforce coding
 * standards, and improve overall maintainability of the codebase.
 *
 * Key points:
 * 1. ESLint automatically detects this configuration when present at the root
 *    of the project (or specified via command-line/config path).
 *
 * 2. Two separate blocks are defined for JS/JSX and TS/TSX files because:
 *    - JavaScript and TypeScript have different parsers and rulesets.
 *    - TypeScript requires @typescript-eslint parser and plugin for type-aware
 *      linting.
 *    - JS/JSX files use the standard ESLint parser with React plugin.
 *
 * 3. The configuration includes:
 *    - Recommended rules from ESLint, TypeScript, React, and React Hooks plugins.
 *    - Global settings for browser environment.
 *    - Special handling for JSX and project-based TypeScript rules.
 *    - Custom rules, such as turning off 'react-in-jsx-scope' (not needed in
 *      React 17+) and specific handling of unused variables.
 *
 * 4. The 'globalIgnores' section ensures certain directories (e.g., 'dist') are
 *    ignored globally.
 *
 * In short, this configuration ensures that both JS and TS code in the project
 * follows best practices, reduces bugs, and maintains a consistent style.
 */

import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),

  // JS / JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react, 'react-hooks': reactHooks, js },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // TS / TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]' },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
