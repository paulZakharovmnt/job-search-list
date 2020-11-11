import { useEffect, useState } from "react";
import getListOfCitiesFromFB from "../getFromFBFuctions/getListOfCitiesFromFB";
import setUpdatedListOfCitiesToFB from "../setToFBFuctions/setUpdatedListOfCitiesToFB";
import setUpdatedListOfSourcesToFB from "../setToFBFuctions/setUpdatedListOfSourcesToFB";
import setUpdatedListOfResultsToFB from "../setToFBFuctions/setUpdatedListOfResultsToFB";
import getListOfSourcesFromFB from "../getFromFBFuctions/getListOfSourcesFromFB";
import getListOfResultsFromFB from "../getFromFBFuctions/getListOfResultsFromFB";

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
  }, [listOfSourcesFromSelectorMenu]);

  useEffect(() => {
    if (listOfResultsFromSelectorMenu.length < 1) {
      return;
    }
    setUpdatedListOfResultsToFB(user, listOfResultsFromSelectorMenu);
  }, [listOfResultsFromSelectorMenu]);

  useEffect(() => {
    if (listOfCitiesFromSelectorMenu.length < 1) {
      return;
    }
    setUpdatedListOfCitiesToFB(user, listOfCitiesFromSelectorMenu);
  }, [listOfCitiesFromSelectorMenu]);

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
  }, []);

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
