module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'indent': 'off',
    'vue/script-indent': [
      'error',
      4
    ],
    'prettier/prettier': [
      'off',
      {
        "htmlWhitespaceSensitivity": 'ignore',
        "proseWrap": 'preserve'
      }
    ],
    'vue/no-v-html': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
