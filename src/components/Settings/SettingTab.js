import React, { useEffect, useState } from "react";
import OptionsTab from "./OptionsTab";
import useSettings from "../../core/customHooks/useSettings";
import { CSSTransition } from "react-transition-group";

const SettingTab = ({ tabNameToRender, user }) => {
  const optionTabs = ["Cities", "Sources", "Results"];
  const [optionTabToRender, setOptionTabToRender] = useState(null);
  const [showOptionTab, setShowOptionTab] = useState(false);

  useEffect(() => {
    setShowOptionTab(false);
    setOptionTabToRender(null);
  }, [tabNameToRender]);

  const handleRenderSelectedTabClick = (tab) => {
    setOptionTabToRender(tab);
    setShowOptionTab(true);
  };

  const [
    {
      listOfSourcesFromSelectorMenu,
      listOfResultsFromSelectorMenu,
      listOfCitiesFromSelectorMenu,
      handleAddNewCityToListSubmit,
      handleAddNewResultToListSubmit,
      handleAddNewSourceToListSubmit,
      handleDeleteCityFromList,
      handleDeleteResultFromList,
      handleDeleteSourceFromList,
    },
  ] = useSettings(user);

  if (tabNameToRender === "Selectors") {
    return (
      <CSSTransition
        in={true}
        appear={true}
        exit={true}
        timeout={300}
        classNames="setting-tab"
        key={tabNameToRender}
      >
        <div className="selector-box">
          <div className="selector-contaner1">
            <h2>Choose selector you would like to edit:</h2>
            {optionTabs.map((option) => (
              <div key={option} className="selector-btn-container">
                <button
                  className={
                    option === optionTabToRender
                      ? "option-selector tab-btn activated"
                      : "option-selector tab-btn"
                  }
                  onClick={() => handleRenderSelectedTabClick(option)}
                >
                  {option}
                </button>
                <i
                  className={
                    option === optionTabToRender
                      ? "fas fa-angle-double-right arrow-btn-selector selected"
                      : "fas fa-angle-double-right arrow-btn-selector"
                  }
                ></i>
              </div>
            ))}
          </div>
          {showOptionTab && (
            <OptionsTab
              optionTabToRender={optionTabToRender}
              user={user}
              listOfSourcesFromSelectorMenu={listOfSourcesFromSelectorMenu}
              listOfResultsFromSelectorMenu={listOfResultsFromSelectorMenu}
              listOfCitiesFromSelectorMenu={listOfCitiesFromSelectorMenu}
              handleAddNewCityToListSubmit={handleAddNewCityToListSubmit}
              handleAddNewResultToListSubmit={handleAddNewResultToListSubmit}
              handleAddNewSourceToListSubmit={handleAddNewSourceToListSubmit}
              handleDeleteCityFromList={handleDeleteCityFromList}
              handleDeleteResultFromList={handleDeleteResultFromList}
              handleDeleteSourceFromList={handleDeleteSourceFromList}
            />
          )}
        </div>
      </CSSTransition>
    );
  }

  if (tabNameToRender === "Personal Info") {
    return (
      <CSSTransition
        in={true}
        appear={true}
        exit={true}
        timeout={650}
        classNames="setting-tab"
        key={tabNameToRender}
      >
        <div>Personal Info</div>
      </CSSTransition>
    );
  }
  if (tabNameToRender === "Language") {
    return <div>Language</div>;
  }
};

export default SettingTab;
