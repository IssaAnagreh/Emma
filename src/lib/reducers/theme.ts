import {ActionTypes, THEMES} from "../constants";

const INIT_STATE = {
  theme: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};
