import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('fixtures/basic', import.meta.url))
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('render security.txt with informations', async () => {
    const body = await $fetch('/.well-known/security.txt')

    expect(body).toMatch(/Contact: me@example.com\nExpires: 2025-02-03T00:00:00.000Z/)
  })

  it('render apple-developer-merchantid-domain-association with right content', async () => {
    const body = await $fetch('/.well-known/apple-developer-merchantid-domain-association')

    expect(body).toMatch(/merchantid/)
  })

  it('render content-url.txt with right content', async () => {
    const body = await $fetch('/.well-known/content-url.txt')

    expect(body).toMatch(/content-url/)
  })
})
