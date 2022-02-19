import { ActionTypes, THEMES } from "../constants";

export const setTheme = (theme: THEMES) => (dispatch: any) => {
  dispatch({
    type: ActionTypes.THEME,
    payload: theme,
  });
};
