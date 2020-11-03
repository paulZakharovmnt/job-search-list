import { useEffect, useState } from "react";
import database from "./firebase";

const UseFetchCompaniesListFromFB = (user) => {
  const [listOfJobs, setListOfJobs] = useState([]);

  const updateListState = (list) => {
    console.log(list);
    setListOfJobs(list);
  };

  useEffect(() => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("listOfJobs")
      .onSnapshot((doc) => {
        if (!doc.data().companyList) {
          return;
        }
        setListOfJobs(doc.data().companyList);
      });
  }, []);

  return [listOfJobs, updateListState];
};

export default UseFetchCompaniesListFromFB;
