import React from "react";
import "./SideBar-Menu.css";
import { naviButtomsText } from "../../core/englishFrenchTexts";

const SideBarMenu = ({
  showSettings,
  setShowSettings,
  settingsBtnClassNames,
  toggleShowJobsListTabClick,
  listOfJobsBtnClassnames,
  addJobBtnClassnames,
  toggleShowJobAddTabClick,
  showFrenchLanguage,
  handleLogOut,
}) => {
  return (
    <div className="black-drop">
      <div className="sidebar-menu">
        <div className="side-nav-list">
          <div className="side-nav-container-1">
            <button
              className={addJobBtnClassnames}
              onClick={toggleShowJobAddTabClick}
            >
              {!showFrenchLanguage ? (
                <span>{naviButtomsText.addNewJob.english}</span>
              ) : (
                <span>{naviButtomsText.addNewJob.french}</span>
              )}
            </button>
            <button
              className={listOfJobsBtnClassnames}
              onClick={toggleShowJobsListTabClick}
            >
              {!showFrenchLanguage ? (
                <span>{naviButtomsText.listOfJobs.english}</span>
              ) : (
                <span>{naviButtomsText.listOfJobs.french}</span>
              )}
            </button>
            <button
              className={settingsBtnClassNames}
              onClick={() => setShowSettings(!showSettings)}
            >
              {!showFrenchLanguage ? (
                <span>{naviButtomsText.settings.english}</span>
              ) : (
                <span>{naviButtomsText.settings.french}</span>
              )}
            </button>
          </div>
          <div className="side-nav-container-2">
            <button className="nav-btn" onClick={handleLogOut}>
              {!showFrenchLanguage ? (
                <span>{naviButtomsText.logout.english}</span>
              ) : (
                <span>{naviButtomsText.logout.french}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;
