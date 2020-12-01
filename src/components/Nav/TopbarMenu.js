import React from "react";
import { naviButtomsText } from "../../core/englishFrenchTexts";

const TopbarMenu = ({
  showAddNewJobTab,
  showSettings,
  setShowSettings,
  toggleShowJobAddTabClick,
  toggleShowJobsListTabClick,
  setSearchInputValue,
  showFrenchLanguage,
  searchInputValue,
  handleLogOut,
  settingsBtnClassNames,
  listOfJobsBtnClassnames,
  addJobBtnClassnames,
  setShowSearchBar,
  showSearchBar,
}) => {
  return (
    <div className="top-bar-menu">
      <div className="nav-container-1">
        <div className="nav-brn-container">
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
      </div>
      <div className="nav-container-2">
        {!showAddNewJobTab && (
          <i
            className="fas fa-search"
            onClick={() => setShowSearchBar(!showSearchBar)}
          />
        )}

        {showSearchBar && (
          <input
            className="inpit-search"
            placeholder="search..."
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
          />
        )}
      </div>
      <div className="nav-container-3">
        <div className="user-btn-container">
          <h3> Hi, User</h3>

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
  );
};

export default TopbarMenu;
