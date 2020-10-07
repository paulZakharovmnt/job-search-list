import React, { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Main from "./components/Database/Main";
import database from "./core/firebase";

const App = () => {
  const [user, setUser] = useState("");

  const handleSetUser = (user) => {
    // createCollection(user.uid);
    setUser(user);
  };

  // const createCollection = (id) => {
  //   // database.collection("what").doc(id).set();
  //   // console.log(
  //   //   database
  //   //     .collection("users")
  //   //     .doc("fOAV5T6d8lMDhOMsE9oZ0v6uIpf2")
  //   //     .onSnapshot((doc) => {
  //   //       console.log(doc.data().test);
  //   //     })
  //   // );

  //   // const listTest = ["1", "2"];
  //   // const InfoTest = { 1: "wefwef", 2: "wefwg" };

  //   console.log(
  //     database
  //       .collection("users")
  //       .doc(id)
  //       .get()
  //       .then((doc) => doc.size)
  //   );
  //   console.log(database.collection("users").doc("111").get());

  //   database
  //     .collection("users")
  //     .doc(id)
  //     .collection("userData")
  //     .doc("fullJobsInfo")
  //     .set({});
  //   database
  //     .collection("users")
  //     .doc(id)
  //     .collection("userData")
  //     .doc("listOfJobs")
  //     .set({});
  // };

  return (
    <div className="App">
      {user ? <Main user={user} /> : <Auth handleSetUser={handleSetUser} />}

      {/* */}
      {/* <Auth handleSetUser={handleSetUser} /> */}
    </div>
  );
};

export default App;
