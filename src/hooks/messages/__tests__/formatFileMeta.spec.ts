import { describe, expect, it } from 'vitest'
import { formatFileByteSize, formatFileMetaLine, getFileTypeLabel } from '../formatFileMeta'

describe('formatFileByteSize', () => {
  it('форматирует байты', () => {
    expect(formatFileByteSize(512)).toBe('512 Б')
    expect(formatFileByteSize(2048)).toBe('2 КБ')
    expect(formatFileByteSize(1572864)).toBe('1.5 МБ')
  })

  it('не пересчитывает уже отформатированную строку', () => {
    expect(formatFileByteSize('240 КБ')).toBe('240 КБ')
  })
})

describe('getFileTypeLabel', () => {
  it('возвращает расширение в верхнем регистре', () => {
    expect(getFileTypeLabel('report.Q4.pdf')).toBe('PDF')
    expect(getFileTypeLabel(undefined, 'https://cdn.example.com/doc.xlsx')).toBe('XLSX')
  })
})

describe('formatFileMetaLine', () => {
  it('соединяет тип и размер', () => {
    expect(formatFileMetaLine('doc.pdf', 'https://example.com/doc.pdf', 1048576)).toBe('PDF - 1МБ')
  })
})