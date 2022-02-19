import moment from "moment";
import React, { useMemo, useState, useEffect } from "react";
import { LOCALES } from "../constants";
import I18n from "../locales";

const LocalizationContext = React.createContext({
  t: (scope: any, options?: any) => String(),
  locale: String(),
  setLocale: () => null,
  direction: "auto",
}) as any;
export const LocalizationProvider = (props: any) => {
  const [locale, setLocale] = useState("");
  const [direction, setDirection]: [
    "auto" | "ltr" | "rtl" | undefined,
    any
  ] = useState("auto");
  const localizationContextMemo = useMemo(
    () => ({
      t: (scope: any, options?: any) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );
  useEffect(() => {
    setLocale(I18n.locale);
    moment.locale(I18n.locale);
    I18n.locale === LOCALES.ARABIC
      ? setDirection(() => "rtl")
      : setDirection(() => "ltr");
  }, [I18n.locale]);
  return (
    //@ts-ignore
    <LocalizationContext.Provider
      value={{ ...localizationContextMemo, direction }}
    >
      {props.children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
