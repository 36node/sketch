module.exports = {
  extends: ["react-app", "prettier", "prettier/react"],
  plugins: ["prettier"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parser: "babel-eslint",

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true,
    },
  },

  rules: {
    "prettier/prettier": "error",
  },

  globals: {
    wx: true,
  },

  settings: {
    react: {
      version: "999.999.999",
    },
  },
};
