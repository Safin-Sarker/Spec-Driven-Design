import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { resolve } from 'path'
import pkg from '../package.json'

const root = resolve(__dirname, '..')

function exists(rel: string) {
  return existsSync(resolve(root, rel))
}

describe('Phase 1 — Project Bootstrap', () => {
  describe('required files exist', () => {
    it('app/layout.tsx', () => expect(exists('app/layout.tsx')).toBe(true))
    it('app/page.tsx', () => expect(exists('app/page.tsx')).toBe(true))
    it('app/components/Header.tsx', () => expect(exists('app/components/Header.tsx')).toBe(true))
    it('app/components/Footer.tsx', () => expect(exists('app/components/Footer.tsx')).toBe(true))
    it('app/components/MainLayout.tsx', () => expect(exists('app/components/MainLayout.tsx')).toBe(true))
    it('app/components/main-layout.css', () => expect(exists('app/components/main-layout.css')).toBe(true))
    it('vitest.config.ts', () => expect(exists('vitest.config.ts')).toBe(true))
  })

  describe('package.json scripts', () => {
    it('has dev script', () => expect(pkg.scripts.dev).toBe('next dev'))
    it('has build script', () => expect(pkg.scripts.build).toBe('next build'))
    it('has start script', () => expect(pkg.scripts.start).toBe('next start'))
    it('has test script', () => expect(pkg.scripts.test).toBe('vitest'))
  })

  describe('package.json dependencies', () => {
    it('next is a dependency', () => expect(pkg.dependencies).toHaveProperty('next'))
    it('react is a dependency', () => expect(pkg.dependencies).toHaveProperty('react'))
    it('react-dom is a dependency', () => expect(pkg.dependencies).toHaveProperty('react-dom'))
    it('vitest is a dev dependency', () => expect(pkg.devDependencies).toHaveProperty('vitest'))
    it('typescript is a dev dependency', () => expect(pkg.devDependencies).toHaveProperty('typescript'))
  })
})
