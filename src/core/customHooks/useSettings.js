import { useEffect, useState } from "react";
import getListOfCitiesFromFB from "../getFromFBFunctions/getListOfCitiesFromFB";
import setUpdatedListOfCitiesToFB from "../setToFBFunctions/setUpdatedListOfCitiesToFB";
import setUpdatedListOfSourcesToFB from "../setToFBFunctions/setUpdatedListOfSourcesToFB";
import setUpdatedListOfResultsToFB from "../setToFBFunctions/setUpdatedListOfResultsToFB";
import getListOfSourcesFromFB from "../getFromFBFunctions/getListOfSourcesFromFB";
import getListOfResultsFromFB from "../getFromFBFunctions/getListOfResultsFromFB";

const useSettings = (user) => {
  const [
    listOfSourcesFromSelectorMenu,
    setListOfSourcesFromSelectorMenu,
  ] = useState([]);

  const [
    listOfResultsFromSelectorMenu,
    setListOfResultsFromSelectorMenu,
  ] = useState([]);

  const [
    listOfCitiesFromSelectorMenu,
    setListOfCitiesFromSelectorMenu,
  ] = useState([]);

  useEffect(() => {
    if (listOfSourcesFromSelectorMenu.length < 1) {
      return;
    }
    setUpdatedListOfSourcesToFB(user, listOfSourcesFromSelectorMenu);
  }, [listOfSourcesFromSelectorMenu, user]);

  useEffect(() => {
    if (listOfResultsFromSelectorMenu.length < 1) {
      return;
    }
    setUpdatedListOfResultsToFB(user, listOfResultsFromSelectorMenu);
  }, [listOfResultsFromSelectorMenu, user]);

  useEffect(() => {
    if (listOfCitiesFromSelectorMenu.length < 1) {
      return;
    }
    setUpdatedListOfCitiesToFB(user, listOfCitiesFromSelectorMenu);
  }, [listOfCitiesFromSelectorMenu, user]);

  useEffect(() => {
    getListOfCitiesFromFB(user).onSnapshot((doc) => {
      setListOfCitiesFromSelectorMenu(doc.data().listOfCitiesFromSelectorMenu);
    });
    getListOfResultsFromFB(user).onSnapshot((doc) => {
      setListOfResultsFromSelectorMenu(
        doc.data().listOfResultsFromSelectorMenu
      );
    });
    getListOfSourcesFromFB(user).onSnapshot((doc) => {
      setListOfSourcesFromSelectorMenu(
        doc.data().listOfSourcesFromSelectorMenu
      );
    });
  }, [user]);

  const handleAddNewCityToListSubmit = (city) => {
    setListOfCitiesFromSelectorMenu([...listOfCitiesFromSelectorMenu, city]);
  };
  const handleAddNewResultToListSubmit = (result) => {
    setListOfResultsFromSelectorMenu([
      ...listOfResultsFromSelectorMenu,
      result,
    ]);
  };
  const handleAddNewSourceToListSubmit = (source) => {
    setListOfSourcesFromSelectorMenu([
      ...listOfSourcesFromSelectorMenu,
      source,
    ]);
  };

  const handleDeleteCityFromList = (city) => {
    setListOfCitiesFromSelectorMenu(
      listOfCitiesFromSelectorMenu.filter(
        (cityFromList) => cityFromList !== city
      )
    );
  };
  const handleDeleteResultFromList = (result) => {
    setListOfResultsFromSelectorMenu(
      listOfResultsFromSelectorMenu.filter(
        (resultFromList) => resultFromList !== result
      )
    );
  };
  const handleDeleteSourceFromList = (source) => {
    setListOfSourcesFromSelectorMenu(
      listOfSourcesFromSelectorMenu.filter(
        (sourceFromList) => sourceFromList !== source
      )
    );
  };
  return [
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
  ];
};

export default useSettings;
