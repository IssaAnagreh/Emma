import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {useColorScheme, StatusBar} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {setTheme} from "../actions/theme";
import {COLORS_LIGHT_THEME, COLORS_DARK_THEME, THEMES} from "../constants";
import LoadingContext from "./LoadingContext";

const ThemeContext = createContext({
  // COLORS are modularized so they can be reused from all the files of the app
  colors: COLORS_LIGHT_THEME,
  // THEMES are modularized so they can be reused from all the files of the app
  updateTheme: (targetTheme?: THEMES.LIGHT | THEMES.DARK) => {},
  isDark: true,
});

export const ThemeProvider = (props: {children: ReactNode}) => {
  const dispatch = useDispatch();
  // fetch theme from the AsyncStorage using Redux
  const {theme} = useSelector((state: any) => state.theme);
  // by default it depends on OS color scheme, unless a user change it manually (PS: changing theme is not available in this project)
  const isDark = !!theme ? theme === THEMES.DARK : useColorScheme() === "dark";

  const {setLoading} = useContext(LoadingContext);

  // app's colors state
  const [colors, setColors] = useState(
    isDark ? COLORS_DARK_THEME : COLORS_LIGHT_THEME,
  ) as any;

  // after changing the theme
  useEffect(() => {
    if (!theme) return;
    setColors(() =>
      theme === THEMES.LIGHT ? COLORS_LIGHT_THEME : COLORS_DARK_THEME,
    );

    // status bar content style depends on the theme
    StatusBar.setBarStyle(
      theme === THEMES.LIGHT ? "light-content" : "dark-content",
    );

    setLoading(false);
  }, [theme]);

  const updateTheme = (targetTheme?: THEMES.LIGHT | THEMES.DARK) => {
    setLoading(true);
    dispatch(
      // targetTheme can be null
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
