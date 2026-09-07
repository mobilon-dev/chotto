import { ref, type Ref } from 'vue'
import { ru } from './ru'
import { en } from './en'
import type { LocaleCode, LocaleInfo, LocaleMessageKey, LocaleMessages } from './types'

export type { LocaleCode, LocaleInfo, LocaleMessageKey, LocaleMessages }

const locales: LocaleInfo[] = [
  {
    code: 'en',
    name: 'English',
    flag: 'england',
  },
  {
    code: 'ru',
    name: 'Pусский',
    flag: 'russian',
  },
]

const locale: Ref<LocaleInfo> = ref(locales[1])

const messages: Record<LocaleCode, LocaleMessages> = {
  ru,
  en,
}

export function useLocale() {
  function t(msg: LocaleMessageKey): string {
    return messages[locale.value.code][msg]
  }

  return {
    t,
    locale,
    locales,
  }
}

export const t = useLocale().t
