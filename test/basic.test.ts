import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('render', async () => {
    const body = await $fetch('/.well-known/security.txt')

    expect(body).toMatch(/Contact: me@example.com\nExpires: 2025-02-03T00:00:00.000Z/)
  })

  it('render with different host', async () => {
    const body = await $fetch('/.well-known/change-password')

    expect(body).toContain('http://localhost:3000/password-recovery')
  })
})
