module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    // Agrega reglas personalizadas aquí según tus necesidades
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
