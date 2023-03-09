import { defineNuxtModule, addServerHandler, createResolver, addTemplate } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'
import type { ChangePasswordOptions, SecurityTxtOptions } from './types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  securityTxt?: SecurityTxtOptions,
  changePassword?: ChangePasswordOptions,
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean
}

const WELL_KNOWN_PREFIX = '.well-known'
const SECURITY_TXT_FILENAME = 'security.txt'
const CHANGE_PASSWORD_PATH = 'change-password'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-well-known',
    configKey: 'wellKnown'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    devtools: true
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#well-known'] = addTemplate({
      filename: 'well-known.mjs',
      write: true,
      getContents: () => `export default ${JSON.stringify(options, null, 2)}`
    }).dst || ''

    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.securityTxt?.disabled !== true) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${SECURITY_TXT_FILENAME}`,
        handler: resolve(runtimeDir, 'server/middleware/security-txt')
      })
    }

    if (options.changePassword?.disabled !== true) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${CHANGE_PASSWORD_PATH}`,
        handler: resolve(runtimeDir, 'server/middleware/change-password')
      })
    }

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolve)
    }
  }
})
