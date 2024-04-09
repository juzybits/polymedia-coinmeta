module.exports = {
    root: true,
    env: {},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    ignorePatterns: ['dist', 'node_modules'],
    parser: '@typescript-eslint/parser',
    plugins: [],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
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
}
