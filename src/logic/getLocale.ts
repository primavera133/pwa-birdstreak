import { enUS, sv } from "date-fns/locale";
export const getLocale = (language: string) => {
  const currentLang = language;
  switch (currentLang) {
    case "sv":
      return sv;
    default:
      return enUS;
  }
};
