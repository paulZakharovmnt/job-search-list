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
  showFrenchLanguage,
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
            {!showFrenchLanguage ? (
              <span>Add New Job</span>
            ) : (
              <span>Ajouter un nouveau travail</span>
            )}
          </button>
          <button
            className={listOfJobsBtnClassnames}
            onClick={toggleShowJobsListTabClick}
          >
            {!showFrenchLanguage ? (
              <span>List of Jobs</span>
            ) : (
              <span>Liste des emplois</span>
            )}
          </button>
          <button
            className={settingsBtnClassNames}
            onClick={() => setShowSettings(!showSettings)}
          >
            {!showFrenchLanguage ? (
              <span>Settings</span>
            ) : (
              <span>Réglages</span>
            )}
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
            {!showFrenchLanguage ? (
              <span>Logout</span>
            ) : (
              <span>Se déconnecter</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
