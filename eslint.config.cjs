const customRules = require('./eslint-plugin-custom.cjs');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const spellcheckPlugin = require('eslint-plugin-spellcheck');
//const tailwindcssPlugin = require('eslint-plugin-tailwindcss');
const eslintCommentsPlugin = require('eslint-plugin-eslint-comments');
const importPlugin = require('eslint-plugin-import');
const reactPerfPlugin = require('eslint-plugin-react-perf');
const prettierPlugin = require('eslint-plugin-prettier');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = [
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      globals: {
        React: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
      'spellcheck': spellcheckPlugin,
      //'tailwindcss': tailwindcssPlugin,
      'custom': customRules,
      'eslint-comments': eslintCommentsPlugin,
      'import': importPlugin,
      'react-perf': reactPerfPlugin,
      'prettier': prettierPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'no-nested-ternary': 'error',
      'no-global-assign': 'error',
      'custom/no-hex-colors': 'warn',
      'custom/no-inline-styles': 'warn',
      //'tailwindcss/classnames-order': 'error',
      'max-lines-per-function': ['warn', { max: 100 }],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'no-console': 'error',
      'react/self-closing-comp': [
        'error', {
          'component': true,
          'html': true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          'prefer': 'type-imports',
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-inline-comments': 'error',
      'no-unused-expressions': ['error', {
        'allowShortCircuit': true,
        'allowTernary': true,
        'allowTaggedTemplates': true,
      }],
      'no-multi-assign': 'error',
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      }],
      'custom/no-global-state-mutation': 'error',
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    files: ['**/*.{ts,tsx}'],
  },
  {
    files: ['src/utils/general-constant.ts'],
    rules: {
      'custom/no-hex-colors': 'off',
    },
  },
];