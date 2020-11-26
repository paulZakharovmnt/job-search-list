import {
  SET_LOGGEDIN_USER,
  LOGOUT_USER,
  CHANGE_LANGUAGE,
} from "./auth-actions";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGGEDIN_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: "" };
    case CHANGE_LANGUAGE:
      return { ...state, showFrenchLanguage: !state.showFrenchLanguage };
    default:
      return state;
  }
};

export default authReducer;
