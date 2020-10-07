import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import database from "../../core/firebase";

const Main = ({ user }) => {
  const [userAddingNewJob, setUserAddingNewJob] = useState(true);
  const [fullJobsInfoList, setfullJobsInfoList] = useState(null);
  const [listOfCompanies, setListOfCompanies] = useState([]);

  const [userInputSearch, setUserInputSearch] = useState("");

  const showJobAddScreen = () => {
    setUserAddingNewJob(true);
  };

  const showJobListPage = () => {
    setUserAddingNewJob(false);
  };

  useEffect(() => {
    getInfoFromFirebase();
    console.log("get");
  }, []);

  useEffect(() => {
    // if (!listOfCompanies) {
    //   return;
    // }
    if (listOfCompanies.length > 0) {
      // setInfoToFirebase();
      console.log("set CompanyList");
      setCompanyList();
    }
    if (fullJobsInfoList) {
      setJobsInfo();
      console.log("set Info");
    }
  }, [listOfCompanies, fullJobsInfoList]);

  // useEffect(() => {
  //   if (!fullJobsInfoList) {
  //     return;
  //   }
  //   setJobsInfo();
  //   console.log("set Info");
  // }, [fullJobsInfoList]);

  const getInfoFromFirebase = () => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("fullJobsInfo")
      .onSnapshot((doc) => {
        setfullJobsInfoList(doc.data());
        console.log(doc.data());
      });

    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("listOfJobs")
      .onSnapshot((doc) => {
        if (!doc.data().listOfCompanies) {
          return;
        }
        setListOfCompanies(doc.data().listOfCompanies);
      });

    // database
    //   .collection(user.id)
    //   .doc("listOfJobs")
    //   .onSnapshot((doc) => {
    //     if (!doc.data().listOfCompanies) {
    //       return;
    //     }
    //     setListOfCompanies(doc.data().listOfCompanies);
    //   });
    // database
    //   .collection(user.id)
    //   .doc("fullJobsInfo")
    //   .onSnapshot((doc) => {
    //     setfullJobsInfoList(doc.data());
    //     console.log(doc.data());
    //   });
  };

  const setCompanyList = () => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("listOfJobs")
      .set({ listOfCompanies });
    // database.collection(user.id).doc("listOfJobs").set({ listOfCompanies });
  };

  const setJobsInfo = () => {
    // database.collection(user.id).doc("fullJobsInfo").set(fullJobsInfoList);
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("fullJobsInfo")
      .set(fullJobsInfoList);
  };

  const setInfoToFirebase = () => {
    database.collection("userId").doc("listOfJobs").set({ listOfCompanies });
    database.collection("userId").doc("fullJobsInfo").set(fullJobsInfoList);
  };

  const submitJobToFirebase = (newFullList, newListOfCompanies) => {
    // database.collection("test").doc("test").add({
    //   job,
    // });
    // database
    //   .collection("test")
    //   .get()
    //   .then((obj) => {
    //     obj.forEach((doc) => {
    //       console.log(doc);
    //     });
    //   });
    // console.log(database.collection("test").doc("test").doc("test?"));
    // database.collection("userId").add({ newListOfCompanies });
    // database.collection("userId").add(newFullList);
    // database.collection("test").doc("test1").set({
    //   job: job,
    // });
  };

  const handleAddJobToList = (job) => {
    const newFullList = { ...fullJobsInfoList };
    newFullList[job.company] = job;
    setfullJobsInfoList(newFullList);

    if (listOfCompanies.includes(job.company)) {
      return;
      // Here should be POPUP window that we have already this company
    }
    const newListOfCompanies = [...listOfCompanies, job.company];
    setListOfCompanies(newListOfCompanies);
    showJobListPage();
    // setInfoToFirebase();

    // submitJobToFirebase();
    // getInfoFromFirebase();
    // submitJobToFirebase(newFullList, newListOfCompanies);
  };
  return (
    <div>
      <Nav
        showJobAddScreen={showJobAddScreen}
        showJobListPage={showJobListPage}
        userInputSearch={userInputSearch}
        setUserInputSearch={setUserInputSearch}
      />
      {userAddingNewJob ? (
        <AddNewJob handleAddJobToList={handleAddJobToList} />
      ) : (
        <JobList
          listOfCompanies={listOfCompanies}
          fullJobsInfoList={fullJobsInfoList}
          userInputSearch={userInputSearch}
        />
      )}
    </div>
  );
};

export default Main;
