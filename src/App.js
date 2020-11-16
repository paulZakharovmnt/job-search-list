import React, { useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Main from "./components/Database/Main";

const App = () => {
  const [user, setUser] = useState("");

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {user ? <Main user={user} /> : <Auth handleSetUser={handleSetUser} />}
    </div>
  );
};

export default App;
