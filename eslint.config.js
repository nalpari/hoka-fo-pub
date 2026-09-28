import js from '@eslint/js';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '.next', 'storybook-static', 'styled-system'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['postcss.config.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'src/**/*.d.ts'],
    plugins: { 'react-hooks': hooks, 'react-refresh': refresh },
    rules: {
      ...hooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', '../../*', '../../../*', '../../../../*'],
              message: 'Use @/* aliases for cross-folder imports instead of relative paths.',
            },
          ],
        },
      ],
    },
  },
);
