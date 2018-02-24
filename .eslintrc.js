module.exports = {
  "extends": ["airbnb", "plugin:react-native/all"],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "plugins": [
    "react-native"
  ],
  "globals": {
    "fetch": true
  },
  "rules": {
    "global-require": ["off"],
    "comma-dangle": ["error", "never"],
    "semi": ["error", "never"],
    "no-plusplus": ["off"],
    "arrow-parens": ["off"],
    "no-restricted-syntax": ["off"],
    "no-continue": ["off"],
    "jsx-a11y/href-no-hash": ["off"],
    "import/no-unresolved": [2, { ignore: ['\.png$', '\.jpg$'] }],
    "import/prefer-default-export": ["off"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": ["off"],
    "class-methods-use-this": ["off"],
    "array-bracket-spacing": ["error", "always", { "objectsInArrays": false }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".android.js",
          ".ios.js"
        ]
      }
    }
  }
};
