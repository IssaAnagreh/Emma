export const DEV = __DEV__;
// please replace localhost with IP_Address
export const API_BASE_URL = "http://192.168.1.79:8080/api/v1";

export const COLORS = {
  primary: "rgba(1, 124, 137, 1)",
  secondary: "rgba(120, 164, 176, 1)",
  tertiary: "rgba(53, 55, 63, 1)",
  light: "white",
  dark: "black",
  red: "#D8000C",
};

export const COLORS_LIGHT_THEME = {...COLORS};

export const COLORS_DARK_THEME = {...COLORS};

export enum THEMES {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export enum ActionTypes {
  THEME = "THEME",
}

export const LOCALES = {
  ENGLISH: "en",
  ARABIC: "ar",
};

export const Screens = {
  HOME_NAVIGATOR: "HOME_NAVIGATOR",
  LANDING_PAGE: "LANDING_PAGE",
  HOME: "HOME",
};
