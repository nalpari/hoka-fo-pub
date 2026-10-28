import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const importSortRule = perfectionist.rules['sort-imports'];

// 정렬기가 고정된 부수 효과 import를 넘어 일반 import를 이동하지 못하게 구간을 분리한다.
const sideEffectSafePerfectionist = {
  ...perfectionist,
  rules: {
    ...perfectionist.rules,
    'sort-imports': {
      ...importSortRule,
      create(context) {
        return {
          'Program:exit'(program) {
            let visitor = null;
            const flush = () => {
              visitor?.['Program:exit']();
              visitor = null;
            };

            for (const node of program.body) {
              if (node.type === 'ImportDeclaration') {
                const isSideEffect = node.specifiers.length === 0;
                if (isSideEffect) flush();
                else {
                  visitor ??= importSortRule.create(context);
                  visitor.ImportDeclaration(node);
                }
              } else if (node.type === 'TSImportEqualsDeclaration') {
                visitor ??= importSortRule.create(context);
                visitor.TSImportEqualsDeclaration(node);
              } else {
                flush();
              }
            }

            flush();
          },
        };
      },
    },
  },
};

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '.next',
      '.tmp',
      '.tmp-*',
      'storybook-static',
      'styled-system',
      '.claude/helpers/**',
    ],
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
    plugins: {
      'react-hooks': hooks,
      'react-refresh': refresh,
      perfectionist: sideEffectSafePerfectionist,
    },
    rules: {
      ...hooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          newlinesBetween: 1,
          sortSideEffects: false,
          groups: [
            'next',
            ['builtin', 'external'],
            'panda',
            'atoms',
            'molecules',
            'organisms',
            'layouts',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          customGroups: [
            { groupName: 'next', elementNamePattern: '^next(?:/|$)' },
            { groupName: 'panda', elementNamePattern: '^styled-system(?:/|$)' },
            {
              groupName: 'atoms',
              elementNamePattern: '^(?:@/components/common/atoms/|@components/atoms/|@atoms/)',
            },
            {
              groupName: 'molecules',
              elementNamePattern: '^(?:@/components/common/molecules/|@components/molecules/)',
            },
            {
              groupName: 'organisms',
              elementNamePattern: '^(?:@/components/common/organisms/|@components/organisms/)',
            },
            {
              groupName: 'layouts',
              elementNamePattern: '^(?:@/components/common/layouts/|@components/layouts/)',
            },
            {
              groupName: 'internal',
              elementNamePattern: '^(?:@/|@components/|@features/|@data/|@mocks/)',
            },
          ],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        { type: 'alphabetical', order: 'asc', groups: [] },
      ],
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
