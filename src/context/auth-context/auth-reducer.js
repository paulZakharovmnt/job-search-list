import { SET_LOGGEDIN_USER, LOGOUT_USER } from "./auth-actions";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGGEDIN_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: "" };
    default:
      return state;
  }
};

export default authReducer;
