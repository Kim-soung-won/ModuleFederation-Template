import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from 'globals';
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/vite-env.d.ts',
      '**/vite.config.ts',
      '**/*.d.ts',
      '**/*.json',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
      "prettier",
    )
  ),
  {
    plugins: {
      "react-refresh": reactRefresh,
      import: fixupPluginRules(_import),
      react: fixupPluginRules(reactPlugin),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: true
      },
    },
    rules: {
      'import/order': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-cycle': 'off',
      'no-console': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-relative-imports': 'off',
      'react/destructuring-assignment': ['off'],
      'no-throw-literal': 'off',
      'consistent-return': 'off',
      'react/no-unused-prop-types': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-plusplus': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/default-props-match-prop-types': 'off',
      'react/forbid-prop-types': 'off',
      'import/no-relative-parent-imports': 'off',
      '@typescript-eslint/no-implicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        { '': 'never', tsx: 'never', ts: 'never' }
      ],
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
      '@typescript-eslint/naming-convention': [
        'off',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        }
      ]
    },
  },
  ...fixupConfigRules(
    compat.extends("plugin:eslint-plugin-import/typescript", "prettier"),
  ).map((config) => ({
    ...config,
    files: [
      "**/*.ts",
      "**/.*.ts",
      "./**/*.ts",
      "./**/.*.ts",
      "**/*.tsx",
      "**/.*.tsx",
      "./**/*.tsx",
      "./**/.*.tsx",
    ],
  })),
  {
    files: [
      "**/*.ts",
      "**/.*.ts",
      "./**/*.ts",
      "./**/.*.ts",
      "**/*.tsx",
      "**/.*.tsx",
      "./**/*.tsx",
      "./**/.*.tsx",
    ],

    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: true,
      },
    },
    rules: {
      "react/no-array-index-key": "off",
      "no-nested-ternary": "off",
      "react/require-default-props": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-throw-literal": "off",

      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1,
          when: "always",
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "variable",
          modifiers: ["destructured"],
          format: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
      ],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "": "never",
          tsx: "never",
          ts: "never",
        },
      ],

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/__tests__/**",
            "**/__mocks__/**",
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "src/shared/lib/test/setup.ts",
            "src/shared/lib/test/test.lib.tsx",
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];