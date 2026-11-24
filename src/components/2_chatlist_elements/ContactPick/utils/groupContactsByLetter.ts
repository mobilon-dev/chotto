import type { ContactPickItem, ContactPickLetterGroup } from '../types';

const LETTER_HEAD_RE = /^[A-ZА-ЯЁ]/i;

export function getContactSortLetter(name: string): string {
  return LETTER_HEAD_RE.test(name) ? name[0].toUpperCase() : '#';
}

export function sortContactsForPick<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const da = LETTER_HEAD_RE.test(a.name);
    const db = LETTER_HEAD_RE.test(b.name);
    if (da === db) {
      return a.name.localeCompare(b.name, 'ru');
    }
    return da ? 1 : -1;
  });
}

export function groupContactsByLetter<T extends ContactPickItem>(
  items: T[],
): ContactPickLetterGroup<T>[] {
  const sorted = sortContactsForPick(items);
  const sections: ContactPickLetterGroup<T>[] = [];
  let currentLetter = '';

  for (const item of sorted) {
    const letter = getContactSortLetter(item.name);
    if (letter !== currentLetter) {
      currentLetter = letter;
      sections.push({ letter, items: [item] });
    } else {
      sections[sections.length - 1].items.push(item);
    }
  }

  return sections;
}