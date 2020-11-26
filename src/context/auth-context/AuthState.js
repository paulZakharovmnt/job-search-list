import React, { useReducer } from "react";
import AuthContext from "./auth-context";
import authReducer from "./auth-reducer";
import {
  SET_LOGGEDIN_USER,
  LOGOUT_USER,
  CHANGE_LANGUAGE,
} from "./auth-actions";

const AuthState = (props) => {
  const initialState = {
    user: "",
    showFrenchLanguage: false,
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

  const changeLanguage = () => {
    dispatch({
      type: CHANGE_LANGUAGE,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        showFrenchLanguage: state.showFrenchLanguage,
        setLoggedInUser,
        logoutUser,
        changeLanguage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
