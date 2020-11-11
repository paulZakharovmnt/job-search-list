import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import EditItem from "./EditItem/EditItem";

import deleteSelectedJobInfoFromList from "../../core/deleteSelectedJobInfoFromList";
import setCompanyNamesListToFB from "../../core/setToFBFuctions/setCompanyNamesListToFB";
import setJobsInformationListToFB from "../../core/setToFBFuctions/setJobsInformationListToFB";
import fetchListOfCompanyNamesUserApplied from "../../core/getFromFBFuctions/fetchListOfCompanyNamesUserApplied";
import fetchListOfCompanyInfoUserApplied from "../../core/getFromFBFuctions/fetchListOfCompanyInformantionUserApplied";
import Settings from "../Settings/Settings";

const Main = ({ user }) => {
  const [fullInfoCompaniesList, setFullInfoCompaniesList] = useState(null);
  const [listOfCompaniesNames, setListOfCompaniesTitles] = useState([]);
  const [jobUserWantsToEdit, setJobUserWantsToEdit] = useState(null);

  const [showUserAddingNewJobTab, setShowUserAddingNewJobTab] = useState(false);
  const [showEditJobWindow, setShowEditJobWindow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [userInputSearch, setUserInputSearch] = useState("");

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
    if (listOfCompaniesNames.length > 0) {
      console.log("set CompanyList");
      setCompanyNamesListToFB(user, listOfCompaniesNames);
    }
    if (fullInfoCompaniesList) {
      setJobsInformationListToFB(user, fullInfoCompaniesList);
      console.log("set Info");
    }
  }, [listOfCompaniesNames, fullInfoCompaniesList]);

  const handleDeleteCompanyFromList = (company) => {
    const companiesListWithoutDeletedCompanyName = listOfCompaniesNames.filter(
      (item) => {
        return item !== company;
      }
    );
    setListOfCompaniesTitles(companiesListWithoutDeletedCompanyName);

    const listOfCompaniesInfoWithoutDeletedCompany = deleteSelectedJobInfoFromList(
      fullInfoCompaniesList,
      company
    );
    setFullInfoCompaniesList(listOfCompaniesInfoWithoutDeletedCompany);

    if (listOfCompaniesNames.length === 1) {
      setCompanyNamesListToFB(user, companiesListWithoutDeletedCompanyName);
    }
  };

  const handleAddJobToListSubmit = (job) => {
    const listOfCompaniesInfoWithNewAddedCompany = { ...fullInfoCompaniesList };
    listOfCompaniesInfoWithNewAddedCompany[job.company] = job;
    setFullInfoCompaniesList(listOfCompaniesInfoWithNewAddedCompany);

    if (listOfCompaniesNames.includes(job.company)) {
      return;
      // Here should be POPUP window that we have already this company
    }
    const listOfCompaniesNamesWithNewAddedCompany = [
      ...listOfCompaniesNames,
      job.company,
    ];
    setListOfCompaniesTitles(listOfCompaniesNamesWithNewAddedCompany);
    showJobsListTab();
  };

  const showJobAddTab = () => {
    setShowUserAddingNewJobTab(true);
    setShowSettings(false);
  };

  const showJobsListTab = () => {
    setShowUserAddingNewJobTab(false);
    setShowSettings(false);
  };

  const closeEditJobWindow = () => {
    setShowEditJobWindow(false);
    setJobUserWantsToEdit(null);
  };

  const handleOpenEditJobWindowClick = (jobInfo) => {
    setJobUserWantsToEdit(jobInfo);
    setShowEditJobWindow(true);
  };

  const addCommentToTheJobInfo = (updatedJob) => {
    let oldList = { ...fullInfoCompaniesList };
    oldList[updatedJob.company] = updatedJob;
    setFullInfoCompaniesList(oldList);
  };

  return (
    <div>
      <Nav
        showJobAddTab={showJobAddTab}
        showJobsListTab={showJobsListTab}
        userInputSearch={userInputSearch}
        setUserInputSearch={setUserInputSearch}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showUserAddingNewJobTab={showUserAddingNewJobTab}
      />
      {showUserAddingNewJobTab ? (
        <AddNewJob
          handleAddJobToListSubmit={handleAddJobToListSubmit}
          user={user}
        />
      ) : (
        <JobList
          listOfCompaniesNames={listOfCompaniesNames}
          fullInfoCompaniesList={fullInfoCompaniesList}
          userInputSearch={userInputSearch}
          handleDeleteCompanyFromList={handleDeleteCompanyFromList}
          handleOpenEditJobWindowClick={handleOpenEditJobWindowClick}
        />
      )}

      {showEditJobWindow && (
        <EditItem
          jobUserWantsToEdit={jobUserWantsToEdit}
          closeEditJobWindow={closeEditJobWindow}
          addCommentToTheJobInfo={addCommentToTheJobInfo}
        />
      )}

      {showSettings && (
        <Settings user={user} setShowSettings={setShowSettings} />
      )}
    </div>
  );
};

export default Main;
