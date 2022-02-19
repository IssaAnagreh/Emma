import { ActionTypes } from "../constants";

const INIT_STATE = {
  onBoarded: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.ON_BOARDED:
      return { ...state, onBoarded: action.payload };
    default:
      return state;
  }
};
