import React, { useState, useEffect, useCallback } from "react";
import { fire } from "../../core/firebase";
import LoginPage from "./LogInPage";
import setDefaultNewUserSettingsToFB from "../../core/setToFBFunctions/setDefaultNewUserSettingsToFB";
import "./Auth.css";

const Auth = ({ handleSetUser }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [hasAccount, setHasAccount] = useState(true);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUserName("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        setDefaultNewUserSettingsToFB(result.user.uid);
        addUserName();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            return;
        }
      });
  };

  const addUserName = () => {
    fire.auth().currentUser.updateProfile({
      displayName: userName,
    });
  };

  const authListener = useCallback(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        handleSetUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        });
      } else {
        handleSetUser("");
      }
    });
  }, [handleSetUser]);

  useEffect(() => {
    authListener();
  }, [authListener]);

  return (
    <div>
      <LoginPage
        email={email}
        setEmail={setEmail}
        setUserName={setUserName}
        userName={userName}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
};

export default Auth;
