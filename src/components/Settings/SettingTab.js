import React, { useEffect, useState } from "react";
import OptionsTab from "./OptionsTab";
import { CSSTransition } from "react-transition-group";

const SettingTab = ({ showingSettingTab, user, showSettingsFolder }) => {
  const optionTabs = ["Cities", "Sources", "Results"];
  const [renderingOptionTab, setRenderingOptionTab] = useState(null);
  const [showOptionsTab, setShowOptionsTab] = useState(false);

  useEffect(() => {
    setShowOptionsTab(false);
    setRenderingOptionTab(null);
  }, [showingSettingTab]);

  const handleRenderTabUserSelectedClick = (tab) => {
    setRenderingOptionTab(tab);
    setShowOptionsTab(true);
  };

  if (showingSettingTab === "Selectors") {
    return (
      <CSSTransition
        in={true}
        appear={true}
        exit={true}
        timeout={300}
        classNames="setting-tab"
        key={showingSettingTab}
      >
        <div className="selector-box">
          <div className="selector-contaner1">
            <h2>Choose selector you would like to edit:</h2>
            {optionTabs.map((option) => (
              <div key={option} className="selector-btn-container">
                <button
                  className={
                    option === renderingOptionTab
                      ? "option-selector tab-btn activated"
                      : "option-selector tab-btn"
                  }
                  onClick={() => handleRenderTabUserSelectedClick(option)}
                >
                  {option}
                </button>
                <i
                  className={
                    option === renderingOptionTab
                      ? "fas fa-angle-double-right arrow-btn-selector selected"
                      : "fas fa-angle-double-right arrow-btn-selector"
                  }
                ></i>
              </div>
            ))}
          </div>
          {showOptionsTab && (
            <OptionsTab renderingOptionTab={renderingOptionTab} user={user} />
          )}
        </div>
      </CSSTransition>
    );
  }

  if (showingSettingTab === "Personal Info") {
    return (
      <CSSTransition
        in={true}
        appear={true}
        exit={true}
        timeout={650}
        classNames="setting-tab"
        key={showingSettingTab}
      >
        <div>Personal Info</div>
      </CSSTransition>
    );
  }
  if (showingSettingTab === "Language") {
    return <div>Language</div>;
  }
};

export default SettingTab;
