/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    },
    globals: true,
    coverage: {
      all: true,
      excludeNodeModules: true,
      reporter: ['html', 'cobertura', 'text'],
      include: ['src'],
      extension: ['.ts']
    }
  }
})
