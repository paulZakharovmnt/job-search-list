import React from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Main from "./components/Database/Main";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);

  return <div className="App">{!user ? <Auth /> : <Main user={user} />}</div>;
};

export default App;
