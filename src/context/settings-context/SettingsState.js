import React, { useReducer } from "react";
import SettingsContext from "./settings-context";
import optionSettingsReducer from "./settings-reducer";
import {
  ADD_OPTION_TO_LIST,
  DELETE_OPTION_FROM_LIST,
  SET_OPTION_FROM_FB,
} from "./settings-actions";

const SettingsState = (props) => {
  const initialCitiesState = [];
  const initialResultssState = [];
  const initialSourcesState = [];

  const [listOfCities, dispatchListOfCities] = useReducer(
    optionSettingsReducer,
    initialCitiesState
  );
  const [listOfResults, dispatchListOfResults] = useReducer(
    optionSettingsReducer,
    initialResultssState
  );
  const [listOfSources, dispatchListOfSources] = useReducer(
    optionSettingsReducer,
    initialSourcesState
  );

  const setCitiesOptionFromFB = (cities) => {
    dispatchListOfCities({
      type: SET_OPTION_FROM_FB,
      payload: cities,
    });
  };
  const setResultsOptionFromFB = (results) => {
    dispatchListOfResults({
      type: SET_OPTION_FROM_FB,
      payload: results,
    });
  };
  const setSourcesOptionFromFB = (sources) => {
    dispatchListOfSources({
      type: SET_OPTION_FROM_FB,
      payload: sources,
    });
  };

  const addCityToList = (city) => {
    dispatchListOfCities({
      type: ADD_OPTION_TO_LIST,
      payload: city,
    });
  };
  const addResultToList = (result) => {
    dispatchListOfResults({
      type: ADD_OPTION_TO_LIST,
      payload: result,
    });
  };
  const addSourceToList = (source) => {
    dispatchListOfSources({
      type: ADD_OPTION_TO_LIST,
      payload: source,
    });
  };

  const deleteCity = (city) => {
    dispatchListOfCities({
      type: DELETE_OPTION_FROM_LIST,
      payload: city,
    });
  };
  const deleteResult = (result) => {
    dispatchListOfResults({
      type: DELETE_OPTION_FROM_LIST,
      payload: result,
    });
  };
  const deleteSource = (source) => {
    dispatchListOfSources({
      type: DELETE_OPTION_FROM_LIST,
      payload: source,
    });
  };
  return (
    <SettingsContext.Provider
      value={{
        listOfCities,
        listOfResults,
        listOfSources,
        setCitiesOptionFromFB,
        setResultsOptionFromFB,
        setSourcesOptionFromFB,
        addCityToList,
        addResultToList,
        addSourceToList,
        deleteCity,
        deleteResult,
        deleteSource,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
