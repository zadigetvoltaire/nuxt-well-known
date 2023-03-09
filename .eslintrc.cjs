module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      { allow: ['error', 'warn'] }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
}
