import { ref } from "vue";
import { ru } from "./ru";
import { en } from "./en";

const locales = [
  {
    code: "en",
    name: "English",
    flag: "england",
  },
  {
    code: "ru",
    name: "Pусский",
    flag: "russian",
  },
];

const locale = ref(locales[1]);

let messages = {
    ru: ru,
    en: en,
  }

export const t = useLocale().t;

export function useLocale() {

  function t(msg) {
    return messages[locale.value.code][msg];
  }

  return {
    t,
    locale,
    locales,
  };
}
