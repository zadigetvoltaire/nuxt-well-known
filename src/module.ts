import { defineNuxtModule, addServerHandler, createResolver, addTemplate } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'
import type { ChangePasswordOptions, SecurityTxtOptions, ContentUriOptions } from './types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  securityTxt?: SecurityTxtOptions,
  changePassword?: ChangePasswordOptions,
  contentUris?: ContentUriOptions[],
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
    name: '@zadigetvoltaire/nuxt-well-known',
    configKey: 'wellKnown',
    compatibility: {
      nuxt: '^3.0.0'
    }
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
      getContents: () => `export default ${JSON.stringify(options, undefined, 2)}`
    }).dst || ''

    const runtimeDirectory = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDirectory)

    if (!options.securityTxt?.disabled) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${SECURITY_TXT_FILENAME}`,
        handler: resolve(runtimeDirectory, 'server/middleware/security-txt')
      })
    }

    if (!options.changePassword?.disabled) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${CHANGE_PASSWORD_PATH}`,
        handler: resolve(runtimeDirectory, 'server/middleware/change-password')
      })
    }

    if (options.contentUris) {
      for (const contentUri of options.contentUris) {
        if (!contentUri?.disabled) {
          addServerHandler({
            route: `/${WELL_KNOWN_PREFIX}/${contentUri.path}`,
            handler: resolve(runtimeDirectory, 'server/middleware/content-uri')
          })
        }
      }
    }

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolve)
    }
  }
})
