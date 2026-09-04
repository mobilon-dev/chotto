import { describe, expect, it } from 'vitest'
import { validateCSSVariablePrefixesInContent } from '../prefixes'
import {
  validateForbiddenGlobalVariablesInContent,
  validateThemeVariablesInContent,
} from '../forbiddenVariables'
import { validateNoDataThemeInContent } from '../dataTheme'

describe('validateCSSVariablePrefixesInContent', () => {
  it('принимает корректные префиксы компонента', () => {
    const result = validateCSSVariablePrefixesInContent(
      'ChatInput',
      'ChatInput',
      'default',
      '--chotto-chatinput-bg: #fff;\n--chotto-chatinput-color: #000;',
    )
    expect(result.isValid).toBe(true)
    expect(result.invalidPrefixes).toEqual([])
  })

  it('ловят чужие префиксы', () => {
    const result = validateCSSVariablePrefixesInContent(
      'ChatInput',
      'ChatInput',
      'default',
      '--chotto-feed-bg: #fff;\n--wrong: 1px;',
    )
    expect(result.isValid).toBe(false)
    expect(result.invalidPrefixes).toEqual(
      expect.arrayContaining(['--chotto-feed-bg', '--wrong']),
    )
  })
})

describe('validateForbiddenGlobalVariablesInContent', () => {
  it('запрещает var(--chotto-theme-*) в style компонента', () => {
    const result = validateForbiddenGlobalVariablesInContent(
      'Feed',
      'Feed',
      'style.scss',
      '.x { color: var(--chotto-theme-primary); }',
    )
    expect(result.isValid).toBe(false)
    expect(result.forbiddenVariables).toContain('--chotto-theme-primary')
  })

  it('пропускает локальные переменные', () => {
    const result = validateForbiddenGlobalVariablesInContent(
      'Feed',
      'Feed',
      'style.scss',
      '.x { color: var(--chotto-feed-text); }',
    )
    expect(result.isValid).toBe(true)
  })
})

describe('validateThemeVariablesInContent', () => {
  it('в theme-файле разрешает только --chotto-theme-*', () => {
    expect(
      validateThemeVariablesInContent(
        'Feed',
        'Feed',
        'default',
        '.t { color: var(--chotto-theme-primary); }',
      ).isValid,
    ).toBe(true)

    expect(
      validateThemeVariablesInContent(
        'Feed',
        'Feed',
        'default',
        '.t { color: var(--chotto-feed-text); }',
      ).isValid,
    ).toBe(false)
  })
})

describe('validateNoDataThemeInContent', () => {
  it('запрещает [data-theme] в style-файлах', () => {
    const bad = validateNoDataThemeInContent(
      'ChatList',
      'ChatList',
      '[data-theme="dark"] .x { color: red; }',
    )
    expect(bad.isValid).toBe(false)
    expect(bad.dataThemeUsage).toContain('[data-theme="dark"]')

    const ok = validateNoDataThemeInContent('ChatList', 'ChatList', '.x { color: red; }')
    expect(ok.isValid).toBe(true)
  })
})
