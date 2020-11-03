import { useEffect, useState } from "react";
import database from "../firebase";

const useSettings = (user) => {
  const [sourcesListOfVacancy, setSourcesListOfVacancy] = useState([
    "LinkedIn",
    "Indeed",
    "GlassDoor",
    "Website of Company",
  ]);

  const [resultsListOfInterviews, setResultsListOfInterviews] = useState([
    "Offer",
    "Sent",
    "Reject",
  ]);

  const [cityOfCompanyWhereApplied, setCityOfCompanyWhereApplied] = useState([
    "Montreal",
    "Toronto",
    "Vancouver",
  ]);

  // useEffect(() => {
  //   getCitiesListFromDatabse();
  //   console.log("get sities");
  // }, []);

  // useEffect(() => {
  //   if (cityOfCompanyWhereApplied.length > 0) {
  //     console.log("set cities");
  //     setNewListOfCitiestoFireBase();
  //   }
  // }, [cityOfCompanyWhereApplied]);

  // const getCitiesListFromDatabse = () => {
  //   database
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("settings")
  //     .doc("cities")
  //     .onSnapshot((doc) => {
  //       setCityOfCompanyWhereApplied(doc.data().cityOfCompanyWhereApplied);
  //     });
  // };

  // const setNewListOfCitiestoFireBase = () => {
  //   database
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("userData")
  //     .doc("listOfJobs")
  //     .set({ cityOfCompanyWhereApplied });
  // };

  // const handleAddNewItemToList = (item) => {
  //   console.log(item);
  //   setCityOfCompanyWhereApplied([...cityOfCompanyWhereApplied, item]);
  // };
  return [
    {
      sourcesListOfVacancy,
      resultsListOfInterviews,
      cityOfCompanyWhereApplied,
      // handleAddNewItemToList,
    },
  ];
};

export default useSettings;
