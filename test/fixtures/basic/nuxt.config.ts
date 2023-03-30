import wellKnown from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    wellKnown
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
    contentUris: [
      { path: 'apple-developer-merchantid-domain-association', content: 'merchantid' },
      { path: 'content-uri.txt', content: 'content-uri' }
    ]
  },
  runtimeConfig: {
    public: {
      wellKnown: {
        contentUris: [
          { path: 'apple-developer-merchantid-domain-association', content: 'merchantid-overrided' }
        ]
      }
    }
  }
})
