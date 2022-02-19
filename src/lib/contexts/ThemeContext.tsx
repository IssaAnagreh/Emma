import React, {createContext, useState, useContext, useEffect} from "react";
import {useColorScheme, StatusBar} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {setTheme} from "../actions/theme";
import {COLORS_LIGHT_THEME, COLORS_DARK_THEME, THEMES} from "../constants";
import LoadingContext from "./LoadingContext";

const ThemeContext = createContext({
  colors: COLORS_LIGHT_THEME,
  updateTheme: (targetTheme?: THEMES.LIGHT | THEMES.DARK) => {},
  isDark: true,
});
export const ThemeProvider = (props: any) => {
  const dispatch = useDispatch();
  const {theme} = useSelector((state: any) => state.theme);
  const isDark = !!theme ? theme === THEMES.DARK : useColorScheme() === "dark";

  const {setLoading} = useContext(LoadingContext);
  const [colors, setColors] = useState(
    isDark ? COLORS_DARK_THEME : COLORS_LIGHT_THEME,
  ) as any;

  useEffect(() => {
    if (!theme) return;
    setColors(() =>
      theme === THEMES.LIGHT ? COLORS_LIGHT_THEME : COLORS_DARK_THEME,
    );
    StatusBar.setBarStyle(
      theme === THEMES.LIGHT ? "light-content" : "dark-content",
    );

    setLoading(false);
  }, [theme]);

  const updateTheme = (targetTheme?: THEMES.LIGHT | THEMES.DARK) => {
    setLoading(true);
    dispatch(
      setTheme(
        !!targetTheme
          ? targetTheme
          : theme === THEMES.LIGHT
          ? THEMES.DARK
          : THEMES.LIGHT,
      ),
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        updateTheme,
        colors,
        isDark,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
