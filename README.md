[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

# Nuxt Well Known

> Nuxt module to add well-known files and rules with middlewares

Nuxt Well Known module is integrated with the [Nuxt Devtools](https://github.com/nuxt/devtools).

## Well Known Supported

- change-password
- security.txt

## Quick Setup

1. Add `nuxt-well-known` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-well-known

# Using yarn
yarn add --dev nuxt-well-known

# Using npm
npm install --save-dev nuxt-well-known
```

2. Add `nuxt-well-known` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-well-known'
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
      url: 'http://example.com/password-recovery'
    }
  }
})
```

## Module Options

```ts
interface ModuleOptions {
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean
  securityTxt?: SecurityTxtOptions,
  changePassword?: ChangePasswordOptions,
}
```

### Middlewares

#### security.txt

This middleware will generate a security.txt file on `/.well-known/security.txt`

Model options:

```ts
type SecurityTxtOptions = {
  disabled?: boolean;
  contacts: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.3
  expires: string | Date; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.5
  encryption?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.4
  acknowledgments?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.1
  preferredLanguages?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.8
  canonical?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.2
  policy?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.7
  hiring?: string[]; // https://www.rfc-editor.org/rfc/rfc9116#section-2.5.6
}
```

#### change-password

This middleware will generate a redirection for the browser on URL `/.well-known/change-password`

```ts
type ChangePasswordOptions = {
  disabled?: boolean;
  url: string;
}
```

That's it! You can now use Nuxt Well Known in your Nuxt app ✨

## Contributing

```bash
# Install dependencies, prepare apps & run dev server
make start

# Run dev server
pnpm dev

# Develop with playground, with bundled client ui
pnpm play:prod

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Release new version
pnpm release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-well-known/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-well-known

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-well-known.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-well-known

[license-src]: https://img.shields.io/npm/l/nuxt-well-known.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-well-known

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com