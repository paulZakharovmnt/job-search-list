import React from "react";
import { fire } from "../../core/firebase";
import "./Nav.css";
import classNames from "classnames";

const Nav = ({
  showJobAddTab,
  showJobsListTab,
  userInputSearch,
  setUserInputSearch,
  setShowSettings,
  showSettings,
  showUserAddingNewJobTab,
}) => {
  const addJobBtnClassnames = classNames("nav-btn", {
    opened: showUserAddingNewJobTab && !showSettings,
  });
  const listOfJobsBtnClassnames = classNames("nav-btn", {
    opened: !showUserAddingNewJobTab && !showSettings,
  });
  const settingsBtnClassNames = classNames("nav-btn", {
    opened: showSettings,
  });

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  return (
    <div className="nav">
      <div className="nav-container-1">
        <div className="nav-brn-container">
          <button className={addJobBtnClassnames} onClick={showJobAddTab}>
            Add New Job
          </button>
          <button className={listOfJobsBtnClassnames} onClick={showJobsListTab}>
            List of Jobs
          </button>
          <button
            className={settingsBtnClassNames}
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </button>
        </div>
      </div>
      <div className="nav-container-2">
        {!showUserAddingNewJobTab && (
          <input
            className="inpit-search"
            placeholder="search..."
            value={userInputSearch}
            onChange={(event) => setUserInputSearch(event.target.value)}
          />
        )}
      </div>
      <div className="nav-container-3">
        <div className="user-btn-container">
          <h3> Hi, User</h3>

          <button className="nav-btn" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
