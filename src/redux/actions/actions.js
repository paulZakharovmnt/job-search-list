export const setUserToState = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setApplicationsById = (applicationsById) => {
  return {
    type: "SET_APPLICATIONS_BY_ID_TO_STATE",
    payload: applicationsById,
  };
};

export const setApplicationsAllIds = (applicationsAllIds) => {
  return {
    type: "SET_APPLICATIONS_ALL_IDS_TO_STATE",
    payload: applicationsAllIds,
  };
};

export const setCitySelectorOption = (listOfCities) => {
  return {
    type: "SET_CITIES_OPTION_TO_STATE",
    payload: listOfCities,
  };
};

export const setSourceSelectorOption = (listOfSources) => {
  return {
    type: "SET_SOURCES_OPTION_TO_STATE",
    payload: listOfSources,
  };
};

export const setResultSelectorOption = (listOfResults) => {
  return {
    type: "SET_RESULTS_OPTION_TO_STATE",
    payload: listOfResults,
  };
};

export const addCitySelector = (cityName) => {
  return {
    type: "ADD_NEW_CITY",
    payload: cityName,
  };
};
export const addSourceSelector = (sourceName) => {
  return {
    type: "ADD_NEW_SOURCE",
    payload: sourceName,
  };
};
export const addResultSelector = (resultName) => {
  return {
    type: "ADD_NEW_RESULT",
    payload: resultName,
  };
};

export const deleteCityFromSelector = (cityName) => {
  return {
    type: "DELETE_SELECTED_CITY",
    payload: cityName,
  };
};

export const deleteSourceFromSelector = (sourceName) => {
  return {
    type: "DELETE_SELECTED_SOURCE",
    payload: sourceName,
  };
};

export const deleteResultFromSelector = (resultName) => {
  return {
    type: "DELETE_SELECTED_RESULT",
    payload: resultName,
  };
};
