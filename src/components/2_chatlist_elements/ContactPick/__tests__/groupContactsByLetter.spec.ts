import { describe, expect, it } from 'vitest';
import {
  getContactSortLetter,
  groupContactsByLetter,
  sortContactsForPick,
} from '../utils/groupContactsByLetter';

describe('groupContactsByLetter', () => {
  it('группирует по букве с блоком # в начале', () => {
    const groups = groupContactsByLetter([
      { id: 1, name: 'Анна' },
      { id: 2, name: '123 Corp' },
      { id: 3, name: 'Борис' },
    ]);

    expect(groups.map((g) => g.letter)).toEqual(['#', 'А', 'Б']);
    expect(groups[1].items.map((i) => i.name)).toEqual(['Анна']);
  });

  it('сортирует по русской локали', () => {
    const sorted = sortContactsForPick([
      { name: 'Яна' },
      { name: 'Анна' },
    ]);
    expect(sorted.map((i) => i.name)).toEqual(['Анна', 'Яна']);
  });

  it('возвращает # для имён без буквы в начале', () => {
    expect(getContactSortLetter('7eleven')).toBe('#');
    expect(getContactSortLetter('Иван')).toBe('И');
  });
});