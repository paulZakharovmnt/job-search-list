import React, { useContext } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Main from "./components/Database/Main";
import AuthContext from "./context/auth-context/auth-context";
import ApplicationsState from "./context/applications-context/ApplicationsState";
import SettingsState from "./context/settings-context/SettingsState";

const App = () => {
  const { user, showFrenchLanguage } = useContext(AuthContext);

  return (
    <div className="App">
      {!user ? (
        <Auth />
      ) : (
        <ApplicationsState>
          <SettingsState>
            <Main user={user} showFrenchLanguage={showFrenchLanguage} />
          </SettingsState>
        </ApplicationsState>
      )}
    </div>
  );
};

export default App;
