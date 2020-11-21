import React, { useContext } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Main from "./components/Database/Main";
import AuthContext from "./context/auth-context/auth-context";
import ApplicationsState from "./context/applications-context/ApplicationsState";
import SettingsState from "./context/settings-context/SettingsState";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className="App">
      {!user ? (
        <Auth />
      ) : (
        <ApplicationsState>
          <SettingsState>
            <Main user={user} />
          </SettingsState>
        </ApplicationsState>
      )}
    </div>
  );
};

export default App;
