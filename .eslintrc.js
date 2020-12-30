module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    curly: 'off',
  },
}
