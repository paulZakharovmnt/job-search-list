import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import database from "../../core/firebase";
import EditItem from "./EditItem/EditItem";

import getUpdatedJobsInfo from "../../core/getUpdatedJobsInfo";
import setJobsListToFB from "../../core/setJobsListToFB";
import setJobsInfoToFB from "../../core/setJobsInfoToFB";
import useSettings from "../../core/customHooks/useSettings";

const Main = ({ user }) => {
  const [userAddingNewJob, setUserAddingNewJob] = useState(true);
  const [fullInfoCompaniesList, setFullInfoCompaniesList] = useState(null);
  const [listOfCompaniesTitles, setListOfCompaniesTitles] = useState([]);

  const [userWantsToEditItem, setUserWantsToEditItem] = useState(false);
  const [jobUserWantsToEdit, setJobUserWantsToEdit] = useState(null);

  const [userInputSearch, setUserInputSearch] = useState("");

  const showJobAddScreen = () => {
    setUserAddingNewJob(true);
  };

  const showJobListPage = () => {
    setUserAddingNewJob(false);
  };

  // const jobs = UseGetInfoFromFirebase(user);
  // console.log(jobs[0]);

  // const list = UseFetchCompaniesListFromFB(user);
  // console.log(list[0]);

  useEffect(() => {
    getInfoFromFirebase();
    // const list = fetchCompaniesListFromFB(user);
    // const jobs = getInfoFromFirebase(user);
    // console.log(list);
    console.log("get");
  }, []);

  useEffect(() => {
    if (listOfCompaniesTitles.length > 0) {
      console.log("set CompanyList");
      setJobsListToFB(user, listOfCompaniesTitles);
    }
    if (fullInfoCompaniesList) {
      setJobsInfoToFB(user, fullInfoCompaniesList);
      console.log("set Info");
    }
  }, [listOfCompaniesTitles, fullInfoCompaniesList]);

  const getInfoFromFirebase = () => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("fullJobsInfo")
      .onSnapshot((doc) => {
        setFullInfoCompaniesList(doc.data());
      });

    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("listOfJobs")
      .onSnapshot((doc) => {
        if (!doc.data().companyList) {
          return;
        }
        setListOfCompaniesTitles(doc.data().companyList);
      });
  };

  const handleDeleteCompanyFromList = (company) => {
    const updatedCompanyList = listOfCompaniesTitles.filter((item) => {
      return item !== company;
    });
    setListOfCompaniesTitles(updatedCompanyList);

    const updatedJobsInfo = getUpdatedJobsInfo(fullInfoCompaniesList, company);
    setFullInfoCompaniesList(updatedJobsInfo);

    if (listOfCompaniesTitles.length === 1) {
      console.log("working");
      setJobsListToFB(user, updatedCompanyList);
    }
  };

  const handleAddJobToList = (job) => {
    const newFullList = { ...fullInfoCompaniesList };
    newFullList[job.company] = job;
    setFullInfoCompaniesList(newFullList);

    if (listOfCompaniesTitles.includes(job.company)) {
      return;
      // Here should be POPUP window that we have already this company
    }
    const newListOfCompanies = [...listOfCompaniesTitles, job.company];
    setListOfCompaniesTitles(newListOfCompanies);
    showJobListPage();
  };

  const handleEditWindowToggler = () => {
    if (userWantsToEditItem) {
      setJobUserWantsToEdit(null);
    }
    setUserWantsToEditItem(!userWantsToEditItem);
  };

  const handleEditJob = (jobInfo) => {
    setJobUserWantsToEdit(jobInfo);
    handleEditWindowToggler();
  };

  const addCommentToTheJobInfo = (updatedJob) => {
    let oldList = { ...fullInfoCompaniesList };
    oldList[updatedJob.company] = updatedJob;
    setFullInfoCompaniesList(oldList);
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
          listOfCompaniesTitles={listOfCompaniesTitles}
          fullInfoCompaniesList={fullInfoCompaniesList}
          userInputSearch={userInputSearch}
          handleDeleteCompanyFromList={handleDeleteCompanyFromList}
          editJob={handleEditJob}
        />
      )}

      {userWantsToEditItem && (
        <EditItem
          jobUserWantsToEdit={jobUserWantsToEdit}
          handleEditWindowToggler={handleEditWindowToggler}
          addCommentToTheJobInfo={addCommentToTheJobInfo}
        />
      )}
    </div>
  );
};

export default Main;
