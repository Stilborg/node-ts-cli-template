module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off', 
    '@typescript-eslint/interface-name-prefix': 'off' // YES, I will prefix my damn interfaces with 'I', thank you very much!
  },
}
