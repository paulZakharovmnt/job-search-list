import React, { useEffect, useState } from "react";
import "./Settings.css";
import Selector from "./OptionsTabs/Selector";
import Options from "./OptionsTabs/Options";
import { CSSTransition } from "react-transition-group";
import SettingTab from "./SettingTab";
import classNames from "classnames";

const Settings = ({ user, setShowSettings }) => {
  const [showingSettingTab, setShowingSettingTab] = useState(null);

  const [showSettingsFolder, setShowSettingsFolder] = useState(false);

  const settingsTabs = ["Personal Info", "Language", "Selectors"];
  const handleSelectTabToRenderClick = (tab) => {
    setShowSettingsFolder(true);
    setShowingSettingTab(tab);
  };

  return (
    <div className="black-background">
      <div className="settings">
        <div className="settings-header">
          <h2>Settings</h2>
          <i
            className="close-settings-btn fas fa-times"
            onClick={() => setShowSettings(false)}
          ></i>
        </div>
        <div className="settings-nav">
          {settingsTabs.map((tab) => (
            <button
              className={
                tab === showingSettingTab ? "tab-btn activated" : "tab-btn"
              }
              value={tab}
              key={tab}
              onClick={() => handleSelectTabToRenderClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="settings-container">
          <div className="tabs-container">
            {showSettingsFolder && (
              <SettingTab
                showingSettingTab={showingSettingTab}
                showSettingsFolder={showSettingsFolder}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
