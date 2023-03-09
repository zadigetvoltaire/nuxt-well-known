import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/devtools-ui-kit'
  ],
  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client')
    }
  },
  app: {
    baseURL: '/__nuxt-well-known'
  }
})
