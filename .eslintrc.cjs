module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb", "airbnb-typescript"],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "rules": {
    'import/no-extraneous-dependencies': [
      'error', { devDependencies: true },
    ],
    '@typescript-eslint/lines-between-class-members': ["error", "always", { "exceptAfterSingleLine": true }],
    'class-methods-use-this': ["error", { "enforceForClassFields": false }],
  }
}
