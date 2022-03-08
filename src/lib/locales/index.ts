import {I18nManager} from "react-native";
import I18n from "i18n-js";

// Import all locales
import en from "./en";
import ar from "./ar";
import {LOCALES} from "../constants";

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations files
I18n.translations = {
  en,
  ar,
};

// default locale
I18n.defaultLocale = LOCALES.ENGLISH;

// choose the locale based on the app's direction (RTL or LTR)
I18n.locale = I18nManager.isRTL ? LOCALES.ARABIC : LOCALES.ENGLISH;

export function strings(name: any, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
