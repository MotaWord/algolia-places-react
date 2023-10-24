module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
  ],
  plugins: [
    'jest',
  ],
  env: {
    'jest/globals': true,
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    indent: ['error', 2],
    'react/destructuring-assignment': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
  },
  overrides: [
    {
      files: ['*.test.js'],
      globals: {
        Event: 'readonly',
        KeyboardEvent: 'readonly',
        MouseEvent: 'readonly',
        window: 'readonly',
      },
      rules: {
        'no-console': 'off',
        'no-empty': 'off',
      },
    },
  ],
};
