export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools'
  ],
  wellKnown: {
    devtools: true,
    securityTxt: {
      disabled: false,
      contacts: ['me@example.com'],
      expires: new Date('2025-02-03')
    },
    changePassword: {
      disabled: false,
      url: 'http://localhost:3000/password-recovery'
    }
  }
})
