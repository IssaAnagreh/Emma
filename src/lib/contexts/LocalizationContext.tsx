import React, {useMemo, useState, useEffect, ReactNode} from "react";
import moment from "moment";
import {LOCALES} from "../constants";
import I18n from "../locales";

const LocalizationContext = React.createContext({
  t: (scope: string, options?: any) => String(),
  locale: String(),
  setLocale: () => null,
  direction: String(),
}) as any;

export const LocalizationProvider = (props: {children: ReactNode}) => {
  // app's locale, this can be changed with change language functionality (PS: not existed in this project)
  const [locale, setLocale] = useState("");
  // app's direction, this can be changed with change language functionality (PS: not existed in this project)
  const [direction, setDirection]: ["auto" | "ltr" | "rtl" | undefined, any] =
    useState("auto");

  const localizationContextMemo = useMemo(
    () => ({
      t: (scope: string, options?: any) => I18n.t(scope, {locale, ...options}),
      locale,
      direction,
    }),
    [locale, direction],
  );

  useEffect(() => {
    setLocale(I18n.locale);
    // change moment.js library default language
    moment.locale(I18n.locale);
    // LOCALES are modularized so they can be reused from all the files of the app
    I18n.locale === LOCALES.ARABIC
      ? setDirection(() => "rtl")
      : setDirection(() => "ltr");
  }, [I18n.locale]);

  return (
    //@ts-ignore
    <LocalizationContext.Provider value={localizationContextMemo}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
