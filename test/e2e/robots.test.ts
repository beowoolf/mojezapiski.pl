import { describe, expect, it } from 'vitest'
import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'

describe('robots.txt', async () => {
  await setup({
    rootDir: process.cwd(),
    // Windows + full Nuxt build needs a generous timeout
    setupTimeout: 240_000,
  })

  it('returns HTTP 200 (not 404)', async () => {
    const response = await fetch('/robots.txt')
    expect(response.status).toBe(200)
  })

  it('allows crawling and points to sitemap', async () => {
    const body = await $fetch<string>('/robots.txt')
    expect(body).not.toMatch(/indexing disabled/i)
    expect(body).toMatch(/User-agent:\s*\*/i)
    // Pełne zezwolenie: Allow: / albo puste Disallow (nie "Disallow: /")
    expect(body).toMatch(/(?:Allow:\s*\/$)|(?:Disallow:\s*$)/m)
    expect(body).not.toMatch(/Disallow:\s*\/\s*$/m)
    expect(body).toContain('Sitemap: https://mojezapiski.pl/sitemap.xml')
  })
})
