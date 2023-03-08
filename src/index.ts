import {defineNuxtModule, addServerHandler, createResolver, addTemplate} from '@nuxt/kit'
// import { name, version } from '../package.json'
import type {ChangePasswordOptions, SecurityTxtOptions} from './types'

export type ModuleOptions = {
  securityTxt?: SecurityTxtOptions,
  changePassword?: ChangePasswordOptions,
}

const WELL_KNOWN_PREFIX = '.well-known'
const SECURITY_TXT_FILENAME = 'security.txt'
const CHANGE_PASSWORD_PATH = 'change-password'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'well-known',
    version: '0.1.0',
    configKey: 'wellKnown',
    compatibility: {
      bridge: true
    }
  },
  defaults: {},
  async setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url)

    nuxt.options.alias['#well-known'] = addTemplate({
      filename: 'well-known.mjs',
      write: true,
      getContents: () => `export default ${JSON.stringify(options, null, 2)}`
    }).dst || ''

    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.securityTxt?.enabled === true) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${SECURITY_TXT_FILENAME}`,
        handler: resolve(runtimeDir, 'server/middleware/security-txt')
      })
    }

    if (options.changePassword?.enabled === true) {
      addServerHandler({
        route: `/${WELL_KNOWN_PREFIX}/${CHANGE_PASSWORD_PATH}`,
        handler: resolve(runtimeDir, 'server/middleware/change-password')
      })
    }
  }
})
