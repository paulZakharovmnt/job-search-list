import React, { useReducer } from "react";
import AuthContext from "./auth-context";
import authReducer from "./auth-reducer";
import { SET_LOGGEDIN_USER, LOGOUT_USER } from "./auth-actions";

const AuthState = (props) => {
  const initialState = {
    user: "",
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoggedInUser = (user) => {
    dispatch({
      type: SET_LOGGEDIN_USER,
      payload: user,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
      payload: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, setLoggedInUser, logoutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
