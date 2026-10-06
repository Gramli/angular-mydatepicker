const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');
const typescriptParser = require('@typescript-eslint/parser');

// Preserve the rules from the previous eslintrc configuration.
module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'tmp/**', 'coverage/**', 'out-tsc/**', '.angular/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@angular-eslint': angular,
      '@angular-eslint/template': angularTemplate,
    },
    processor: angularTemplate.processors['extract-inline-html'],
    rules: {
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@angular-eslint/component-selector': ['error', { prefix: 'lib', style: 'kebab-case', type: 'element' }],
      '@angular-eslint/directive-selector': ['error', { prefix: 'lib', style: 'camelCase', type: 'attribute' }],
    },
  },
  {
    files: ['projects/angular-mydatepicker/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          'projects/angular-mydatepicker/tsconfig.lib.json',
          'projects/angular-mydatepicker/tsconfig.spec.json',
        ],
      },
    },
    rules: {
      '@angular-eslint/directive-selector': ['warn', { prefix: 'lib', style: 'camelCase', type: 'attribute' }],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: { parser: templateParser },
    plugins: { '@angular-eslint/template': angularTemplate },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
    },
  },
];
