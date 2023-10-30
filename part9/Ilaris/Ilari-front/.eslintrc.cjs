module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "semi": [2, "always"],
    "no-multi-spaces": "error",
    "quotes": [2, "single"],
    'jsx-quotes': [2, 'prefer-single'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  }
}