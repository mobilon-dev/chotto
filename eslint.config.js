// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,
  
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  
  // Vue recommended rules
  ...pluginVue.configs['flat/recommended'],
  
  // Storybook recommended rules
  ...storybook.configs["flat/recommended"],
  
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
      },
    },
    rules: {
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/require-toggle-inside-transition': 'off',
      'vue/require-default-prop': 'warn',
      'vue/no-dupe-keys': 'error',
      'vue/require-v-for-key': 'error',
      'vue/return-in-computed-property': 'error',
    }
  },
  
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  
  {
    ignores: ["dist/**", "node_modules/**", ".history/**", "scripts/**"]
  }
];
