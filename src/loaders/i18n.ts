import i18n from "i18n";

import CONFIG from "@src/config";

export function loadI18n() {
  i18n.configure({
    locales: ["en", "ua", "ru"],
    directory: `locales`,
  });

  i18n.setLocale(CONFIG.LOCALE);
}
