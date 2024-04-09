module.exports = {
    root: true,
    env: {},
    ignorePatterns: ['dist', 'node_modules'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [
            './tsconfig.json',
            './src/cli/tsconfig.json',
            './src/sdk/tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
    },
    plugins: [],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
    overrides: [
        {
            files: ['src/cli/**/*'],
            env: { node: true },
            rules: {
            },
        },
        {
            files: ['src/sdk/**/*'],
            env: { node: false },
            rules: {
            },
        },
    ],
};
