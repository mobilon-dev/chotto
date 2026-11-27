import { describe, expect, it } from 'vitest'
import { decodeDisplayFilename } from '../decodeDisplayFilename'

describe('decodeDisplayFilename', () => {
  it('возвращает undefined и пустую строку как есть', () => {
    expect(decodeDisplayFilename(undefined)).toBeUndefined()
    expect(decodeDisplayFilename('')).toBe('')
  })

  it('не трогает обычные имена', () => {
    expect(decodeDisplayFilename('Расписание.pdf')).toBe('Расписание.pdf')
    expect(decodeDisplayFilename('doc.pdf')).toBe('doc.pdf')
  })

  it('декодирует percent-encoded utf-8', () => {
    const encoded =
      '%D0%A1%D1%87%D0%B5%D1%82_%E2%84%96_%D0%90%D0%A6-9207_%D0%98%D0%9F__%D0%9F%D1%80%D0%B5%D0%B4%D1%82%D0%B5%D1%87%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%9D%D0%B0%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0_%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0_%D0%BE%D1%82_26.11.2026_%D0%B3._.pdf'
    expect(decodeDisplayFilename(encoded)).toBe(
      'Счет_№_АЦ-9207_ИП__Предтеченская_Надежда_Михайловна_от_26.11.2026_г._.pdf',
    )
  })

  it('при невалидной строке возвращает исходное значение', () => {
    expect(decodeDisplayFilename('%E0%A4%A')).toBe('%E0%A4%A')
  })
})