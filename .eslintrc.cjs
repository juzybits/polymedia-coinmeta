module.exports = {
    root: true,
    env: {},
    ignorePatterns: ["dist", "node_modules"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [
            "./tsconfig.json",
            "./src/cli/tsconfig.json",
            "./src/sdk/tsconfig.json",
            "./src/web/tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
    },
    plugins: [],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    overrides: [
        {
            files: ["src/cli/**/*"],
            env: { node: true },
            rules: {
                // Chill with the any checks
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
            },
        },
        {
            files: ["src/sdk/**/*"],
            env: { node: false },
            rules: {
            },
        },
        {
            files: ["src/web/**/*"],
            env: { browser: true },
            plugins: ["react-refresh"],
            extends: [
                "plugin:react-hooks/recommended",
                "plugin:react/jsx-runtime",
                "plugin:react/recommended",
            ],
            rules: {
                "@typescript-eslint/consistent-type-definitions": ["error", "type"],
                "@typescript-eslint/no-floating-promises": "off",
                "@typescript-eslint/no-misused-promises": "off",
                "@typescript-eslint/prefer-nullish-coalescing": [ "error", { "ignoreConditionalTests": true } ],
                "@typescript-eslint/restrict-template-expressions": "off",
                "react-hooks/exhaustive-deps": "off",
                "react/no-unescaped-entities": "off",
                "react/prop-types": "off",
                "react/react-in-jsx-scope": "off",
            },
            settings: {
                react: {
                    version: "detect"
                }
            },
        },
    ],
};
