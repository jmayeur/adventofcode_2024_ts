module.exports = {
    root: true,
    env: {
        browser: false,
        es6: true,
        node: true
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.eslint.json', './tsconfig.json']
    },
    extends: [
        'airbnb-typescript/base',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript'
    ],
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never'
            }
        ],
        '@typescript-eslint/explicit-function-return-type': 'error'
    }
}