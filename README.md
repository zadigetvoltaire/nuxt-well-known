<!-- omit in toc -->

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

# Nuxt Well-Known

> Nuxt module to handle `.well-known` URIs with middlewares
> See https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml

Nuxt Well-Known module is integrated with the [Nuxt Devtools](https://github.com/nuxt/devtools).


## Well-Known URIs Supported

1. [`security.txt`](#securitytxt)
2. [`change-password`](#change-password)
3. Dynamic routes with content: [`content-urls`](#content-urls)

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
      redirectTo: 'https://example.com/password-recovery'
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
  contentUrls?: ContentUrlOptions[],
}
```

### Middlewares

#### `security.txt`

This middleware will generate a `security.txt` file available under `/.well-known/security.txt` URI.

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

#### `change-password`

This middleware will redirect requests of `/.well-known/change-password` to the configured target URL.

```ts
type ChangePasswordOptions = {
  disabled?: boolean;
  redirectTo: string;
}
```

#### `content-urls`

With this middleware, you can generate urls with content

```ts
type ContentUrlOptions = {
  disabled?: boolean;
  url: string;
  content: string;
}
```

**Example:**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'nuxt-well-known',
  ],
  wellKnown: {
    contentUrls: [
      { url: 'apple-developer-merchantid-domain-association', content: 'merchantid' },
      { url: 'content-url.txt', content: 'content-url' }
    ]
  }
})
```

Will render
- https://example.com/.well-known/apple-developer-merchantid-domain-association --> `merchantid`
- https://example.com/.well-known/content-url.txt --> `content-url`

---

That's it! You can now use Nuxt Well-Known in your Nuxt app ✨

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
