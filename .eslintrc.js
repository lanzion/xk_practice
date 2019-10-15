// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
//   globals: {
//     '$': false,
//     'OSS': false,
//     'uploader': false,
//     'WxLogin': false,
//     'AliyunUpload': false
//   },
  globals: {
    'configs': false,
    'OSS': false,
    'AliyunUpload': false,
    'Aliplayer': false,
    'baidubce': false
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'arrow-body-style': 0,
    'indent': ['error', 4, {'SwitchCase': 1}],
    'linebreak-style': [0, 'windows'],
    'default-case': 0,
    'func-names': 0,
    'guard-for-in': 0,
    'max-len': [0, 200],
    'no-underscore-dangle': 0,
    'no-shadow': ['error', { 'allow': ['state'] }],
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-useless-return': 0,
    'no-continue': 0,
    'no-else-return': 0,
    'no-unexpected-multiline': 0,
    'no-unused-expressions': [2, { 'allowShortCircuit': true, 'allowTernary': true }],
    'no-console': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-mutable-exports': 0,
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'no-await-in-loop': 0,
    'no-mixed-operators': 0,
    'object-shorthand': 0,
    'prefer-arrow-callback': 0,
    'prefer-template': 0,
    'prefer-rest-params': 0,
    'space-unary-ops': [0, { 'words': true, 'nonwords': false }],
    'array-bracket-spacing': ['error', 'never']
  }
}
