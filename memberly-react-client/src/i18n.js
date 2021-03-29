import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./assets/locales/en/translation.json";
import translationCN from "./assets/locales/cn/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  zh: {
    translation: translationCN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
