import React, { useContext, useState } from "react";
import { fire } from "../../core/firebase";

import "./Nav.css";
import classNames from "classnames";
import AuthContext from "../../context/auth-context/auth-context";
import SideBarMenu from "./SideBar-Menu";
import TopbarMenu from "./TopbarMenu";

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

  const [sidebarMenuOpened, setSidebarMenuOpened] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const burgerTopClasses = classNames("burger", "burger-top", {
    open: sidebarMenuOpened,
    close: !sidebarMenuOpened,
  });
  const burgerMiddleClasses = classNames("burger", "burger-middle", {
    open: sidebarMenuOpened,
    close: !sidebarMenuOpened,
  });
  const burgerBottomClasses = classNames("burger", "burger-bottom", {
    open: sidebarMenuOpened,
    close: !sidebarMenuOpened,
  });

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
      <div
        className="burger-container"
        onClick={() => setSidebarMenuOpened(!sidebarMenuOpened)}
      >
        <div className={burgerTopClasses}></div>
        <div className={burgerMiddleClasses}></div>
        <div className={burgerBottomClasses}></div>
      </div>
      <TopbarMenu
        showAddNewJobTab={showAddNewJobTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        toggleShowJobAddTabClick={toggleShowJobAddTabClick}
        toggleShowJobsListTabClick={toggleShowJobsListTabClick}
        setSearchInputValue={setSearchInputValue}
        showFrenchLanguage={showFrenchLanguage}
        searchInputValue={searchInputValue}
        handleLogOut={handleLogOut}
        addJobBtnClassnames={addJobBtnClassnames}
        listOfJobsBtnClassnames={listOfJobsBtnClassnames}
        settingsBtnClassNames={settingsBtnClassNames}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
      {sidebarMenuOpened && (
        <SideBarMenu
          addJobBtnClassnames={addJobBtnClassnames}
          listOfJobsBtnClassnames={listOfJobsBtnClassnames}
          settingsBtnClassNames={settingsBtnClassNames}
          showAddNewJobTab={showAddNewJobTab}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          toggleShowJobAddTabClick={toggleShowJobAddTabClick}
          toggleShowJobsListTabClick={toggleShowJobsListTabClick}
          setSearchInputValue={setSearchInputValue}
          showFrenchLanguage={showFrenchLanguage}
          searchInputValue={searchInputValue}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
};

export default Nav;
