import React, { useContext, useEffect } from "react";
import AddInput from "./AddInput";
import settingsContext from "../../context/settings-context/settings-context";
import authContext from "../../context/auth-context/auth-context";
import setUpdatedListOfSourcesToFB from "../../core/setToFBFunctions/setUpdatedListOfSourcesToFB";
import setUpdatedListOfResultsToFB from "../../core/setToFBFunctions/setUpdatedListOfResultsToFB";
import setUpdatedListOfCitiesToFB from "../../core/setToFBFunctions/setUpdatedListOfCitiesToFB";
import "./OptionsTab.css";

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
      <div className="selector-contaner2">
        <h4>Delete or Add new city in the List:</h4>
        <ul className="list-of-items">
          {listOfCities.map((city) => (
            <div key={city} className="list-contaniner">
              <li>{city}</li>
              <button onClick={() => deleteCity(city)}>Delete</button>
              <i
                onClick={() => deleteCity(city)}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput addNewOptionToList={addCityToList} />
      </div>
    );
  }

  if (optionTabToRender === "Sources") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new source in the List:</h4>
        <ul className="list-of-items">
          {listOfSources.map((source) => (
            <div key={source} className="list-contaniner">
              <li>{source}</li>
              <i
                onClick={() => deleteSource(source)}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput addNewOptionToList={addSourceToList} />
      </div>
    );
  }

  if (optionTabToRender === "Results") {
    return (
      <div className="selector-contaner2">
        <h4>Delete or Add new result in the List:</h4>
        <ul className="list-of-items">
          {listOfResults.map((result) => (
            <div key={result} className="list-contaniner">
              <li>{result}</li>
              <i
                onClick={() => deleteResult(result)}
                className="delete-item-btn fas fa-trash-alt"
              ></i>
            </div>
          ))}
        </ul>
        <AddInput addNewOptionToList={addResultToList} />
      </div>
    );
  }
};

export default OptionsTab;
