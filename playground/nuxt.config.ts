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
      redirectTo: 'http://localhost:3000/password-recovery'
    },
    contentUrls: [
      { url: 'apple-developer-merchantid-domain-association', content: 'merchantid' },
      { url: 'content-url.txt', content: 'content-url' }
    ]
  }
})
