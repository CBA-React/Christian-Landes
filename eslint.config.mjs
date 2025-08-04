import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier';
import jsonPlugin from '@eslint/json';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'next',
        'prettier',
    ),
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        plugins: {
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
            json: jsonPlugin,
            prettier: eslintPluginPrettierRecommended,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4,
                    useTabs: false,
                    singleQuote: true,
                    semi: true,
                    trailingComma: 'all',
                    bracketSpacing: true,
                    printWidth: 80,
                    arrowParens: 'always',
                    endOfLine: 'crlf',
                },
            ],
            semi: ['error', 'always'],
            '@typescript-eslint/explicit-function-return-type': ['warn'],
            '@typescript-eslint/explicit-module-boundary-types': ['warn'],
            'no-console':
                process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^react$', '^@?\\w'],
                        ['^@', '^'],
                        ['^\\./'],
                        ['^.+\\.(module.css|module.scss)$'],
                        ['^.+\\.(gif|png|svg|jpg)$'],
                    ],
                },
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': ['warn'],
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
        ignores: ['node_modules/', '.next/', 'build/'],
    },
];

export default eslintConfig;
