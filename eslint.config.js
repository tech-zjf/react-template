import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended, // 确保这个配置存在
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            prettierConfig,
        ],
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@next/next/no-img-element': 'off',
            'react/no-unescaped-entities': 'off',
            'react/jsx-key': 'off',
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    {
        files: ['**/*.css'],
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error',
        },
    },
]);
