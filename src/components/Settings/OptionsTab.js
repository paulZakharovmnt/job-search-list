import React, { useContext, useEffect } from "react";
import settingsContext from "../../context/settings-context/settings-context";
import authContext from "../../context/auth-context/auth-context";
import setUpdatedListOfSourcesToFB from "../../core/setToFBFunctions/setUpdatedListOfSourcesToFB";
import setUpdatedListOfResultsToFB from "../../core/setToFBFunctions/setUpdatedListOfResultsToFB";
import setUpdatedListOfCitiesToFB from "../../core/setToFBFunctions/setUpdatedListOfCitiesToFB";
import "./OptionsTab.css";
import ListOfCities from "./OptionTabs/ListOfCities";
import ListOfSources from "./OptionTabs/ListOfSources";
import ListOfResults from "./OptionTabs/ListOfResults";

const OptionsTab = ({ optionTabToRender }) => {
  const {
    listOfCities,
    listOfResults,
    listOfSources,
    addCityToList,
    addResultToList,
    addSourceToList,
    deleteCity,
    deleteResult,
    deleteSource,
  } = useContext(settingsContext);

  const { user } = useContext(authContext);

  useEffect(() => {
    if (listOfSources.length < 1) {
      return;
    }
    setUpdatedListOfSourcesToFB(user, listOfSources);
  }, [listOfSources, user]);

  useEffect(() => {
    if (listOfResults.length < 1) {
      return;
    }
    setUpdatedListOfResultsToFB(user, listOfResults);
  }, [listOfResults, user]);

  useEffect(() => {
    if (listOfCities.length < 1) {
      return;
    }
    setUpdatedListOfCitiesToFB(user, listOfCities);
  }, [listOfCities, user]);

  if (optionTabToRender === "Cities") {
    return (
      <ListOfCities
        listOfCities={listOfCities}
        deleteCity={deleteCity}
        addCityToList={addCityToList}
      />
    );
  }

  if (optionTabToRender === "Sources") {
    return (
      <ListOfSources
        listOfSources={listOfSources}
        addSourceToList={addSourceToList}
        deleteSource={deleteSource}
      />
    );
  }

  if (optionTabToRender === "Results") {
    return (
      <ListOfResults
        listOfResults={listOfResults}
        deleteResult={deleteResult}
        addResultToList={addResultToList}
      />
    );
  }
};

export default OptionsTab;
