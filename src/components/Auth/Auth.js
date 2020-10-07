import React, { useState, useEffect } from "react";
import { fire } from "../../core/firebase";
import LoginPage from "./LogInPage";
import database from "../../core/firebase";
import "./Auth.css";

const Auth = ({ handleSetUser }) => {
  //   const [user, setUser] = useState("");
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
      .catch((err) => console.log(err));
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        createCollection(result.user.uid);
      })
      .catch((err) => console.log(err));
  };

  const createCollection = (id) => {
    // database.collection("what").doc(id).set();
    // console.log(
    //   database
    //     .collection("users")
    //     .doc("fOAV5T6d8lMDhOMsE9oZ0v6uIpf2")
    //     .onSnapshot((doc) => {
    //       console.log(doc.data().test);
    //     })
    // );

    // const listTest = ["1", "2"];
    // const InfoTest = { 1: "wefwef", 2: "wefwg" };

    // console.log(
    //   database
    //     .collection("users")
    //     .doc(id)
    //     .get()
    //     .then((doc) => doc.size)
    // );
    // console.log(database.collection("users").doc("111").get());

    database
      .collection("users")
      .doc(id)
      .collection("userData")
      .doc("fullJobsInfo")
      .set({});
    database
      .collection("users")
      .doc(id)
      .collection("userData")
      .doc("listOfJobs")
      .set({});
    fire.auth().currentUser.updateProfile({
      displayName: userName,
    });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        console.log(user);
        let userInfo = {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        };
        handleSetUser(userInfo);
        // setUser(user);
      } else {
        // setUser("");
        handleSetUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

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
