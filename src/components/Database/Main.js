import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import EditItem from "./EditItem/EditItem";

import getUpdatedJobsInfo from "../../core/getUpdatedJobsInfo";
import setJobsListToFB from "../../core/setJobsListToFB";
import setJobsInfoToFB from "../../core/setJobsInfoToFB";
import fetchListOfCompanyNamesUserApplied from "../../core/getFromFBFuctions/fetchListOfCompanyNamesUserApplied";
import fetchListOfCompanyInfoUserApplied from "../../core/getFromFBFuctions/fetchListOfCompanyInformantionUserApplied";
import Settings from "../Settings/Settings";

const Main = ({ user }) => {
  const [fullInfoCompaniesList, setFullInfoCompaniesList] = useState(null);
  const [listOfCompaniesTitles, setListOfCompaniesTitles] = useState([]);
  const [jobUserWantsToEdit, setJobUserWantsToEdit] = useState(null);

  const [userAddingNewJob, setUserAddingNewJob] = useState(true);
  const [userWantsToEditItem, setUserWantsToEditItem] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [userInputSearch, setUserInputSearch] = useState("");

  const showJobAddScreen = () => {
    setUserAddingNewJob(true);
  };

  const showJobListPage = () => {
    setUserAddingNewJob(false);
  };

  useEffect(() => {
    fetchListOfCompanyInfoUserApplied(user).onSnapshot((doc) => {
      setFullInfoCompaniesList(doc.data());
    });
    fetchListOfCompanyNamesUserApplied(user).onSnapshot((doc) => {
      if (!doc.data().companyList) {
        return;
      }
      setListOfCompaniesTitles(doc.data().companyList);
    });

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
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      {userAddingNewJob ? (
        <AddNewJob handleAddJobToList={handleAddJobToList} user={user} />
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

      {showSettings && <Settings user={user} />}
    </div>
  );
};

export default Main;
