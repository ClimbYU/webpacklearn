module.exports = {
  parserOptions: {
    "parser": "babel-eslint"
  },
  // "parser": "babel-eslint",
  "extends": [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "indent": ["error", 4]
  }
};