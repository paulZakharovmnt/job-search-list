import React, { useState } from "react";
import "./Settings.css";
import SettingTab from "./SettingTab";

const SettingsModal = ({ setShowSettings }) => {
  const [tabNameToRender, setTabNameToRender] = useState(null);

  const [showSettingTab, setShowSettingTab] = useState(false);

  const settingTabs = ["Personal Info", "Language", "Selectors"];

  const handleSelectTabToRenderClick = (tab) => {
    setShowSettingTab(true);
    setTabNameToRender(tab);
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
          {settingTabs.map((tab) => (
            <button
              className={
                tab === tabNameToRender ? "tab-btn activated" : "tab-btn"
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
            {showSettingTab && (
              <SettingTab
                tabNameToRender={tabNameToRender}
                showSettingTab={showSettingTab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
