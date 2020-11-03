import { useEffect, useState } from "react";
import getListOfCitiesFromFB from "../getFromFBFuctions/getListOfCitiesFromFB";
import setUpdatedListOfCitiesToFB from "../setToFBFuctions/setUpdatedListOfCitiesToFB";
import getListOfSourcesFromFB from "../getFromFBFuctions/getListOfSourcesFromFB";
import getListOfResultsFromFB from "../getFromFBFuctions/getListOfResultsFromFB";

const useSettings = (user) => {
  const [
    sourcesListWhereUserIsApplying,
    setSourcesListWhereUserIsApplying,
  ] = useState([]);

  const [resultsListOfInterviews, setResultsListOfInterviews] = useState([]);

  const [
    citiesListWhereUserIsApplying,
    setCitiesListWhereUserIsApplying,
  ] = useState([]);

  useEffect(() => {
    if (citiesListWhereUserIsApplying.length < 1) {
      return;
    }
    console.log("set cities");
    setUpdatedListOfCitiesToFB(user, citiesListWhereUserIsApplying);
  }, [citiesListWhereUserIsApplying]);

  useEffect(() => {
    getListOfCitiesFromFB(user).onSnapshot((doc) => {
      setCitiesListWhereUserIsApplying(
        doc.data().citiesListWhereUserIsApplying
      );
    });
    getListOfResultsFromFB(user).onSnapshot((doc) => {
      setResultsListOfInterviews(doc.data().resultsListOfInterviews);
    });
    getListOfSourcesFromFB(user).onSnapshot((doc) => {
      setSourcesListWhereUserIsApplying(
        doc.data().sourcesListWhereUserIsApplying
      );
    });
    console.log("get cities");
  }, []);

  const handleAddNewItemToList = (item) => {
    setCitiesListWhereUserIsApplying([...citiesListWhereUserIsApplying, item]);
  };

  return [
    {
      sourcesListWhereUserIsApplying,
      resultsListOfInterviews,
      citiesListWhereUserIsApplying,
      handleAddNewItemToList,
    },
  ];
};

export default useSettings;
