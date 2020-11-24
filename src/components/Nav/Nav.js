import React, { useContext } from "react";
import { fire } from "../../core/firebase";
import "./Nav.css";
import classNames from "classnames";
import AuthContext from "../../context/auth-context/auth-context";

const Nav = ({
  toggleShowJobAddTabClick,
  toggleShowJobsListTabClick,
  searchInputValue,
  setSearchInputValue,
  setShowSettings,
  showSettings,
  showAddNewJobTab,
}) => {
  const { logoutUser } = useContext(AuthContext);

  const addJobBtnClassnames = classNames("nav-btn", {
    opened: showAddNewJobTab && !showSettings,
  });
  const listOfJobsBtnClassnames = classNames("nav-btn", {
    opened: !showAddNewJobTab && !showSettings,
  });
  const settingsBtnClassNames = classNames("nav-btn", {
    opened: showSettings,
  });

  const handleLogOut = () => {
    fire.auth().signOut();
    logoutUser();
  };

  return (
    <div className="nav">
      <div className="nav-container-1">
        <div className="nav-brn-container">
          <button
            className={addJobBtnClassnames}
            onClick={toggleShowJobAddTabClick}
          >
            Add New Job
          </button>
          <button
            className={listOfJobsBtnClassnames}
            onClick={toggleShowJobsListTabClick}
          >
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
        {!showAddNewJobTab && (
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
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
