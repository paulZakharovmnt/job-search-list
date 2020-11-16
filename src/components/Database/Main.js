import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import EditItem from "./EditItem/EditItem";

import deleteSelectedJobInfoFromList from "../../core/deleteSelectedJobInfoFromList";
import setCompanyNamesListToFB from "../../core/setToFBFunctions/setCompanyNamesListToFB";
import setJobsInformationListToFB from "../../core/setToFBFunctions/setJobsInformationListToFB";
import fetchListOfCompanyNamesUserApplied from "../../core/getFromFBFunctions/fetchListOfCompanyNamesUserApplied";
import fetchListOfCompanyInfoUserApplied from "../../core/getFromFBFunctions/fetchListOfCompanyInformantionUserApplied";
import SettingsWindow from "../Settings/SettingsWindow";

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
  }, []);

  useEffect(() => {
    if (listOfCompaniesNames.length > 0) {
      setCompanyNamesListToFB(user, listOfCompaniesNames);
    }
    if (fullInfoCompaniesList) {
      setJobsInformationListToFB(user, fullInfoCompaniesList);
    }
  }, [listOfCompaniesNames, fullInfoCompaniesList]);

  const handleDeleteCompanyFromList = (company) => {
    const companiesListWithoutDeletedCompanyName = listOfCompaniesNames.filter(
      (item) => item !== company
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
      // TODO: Here should be POPUP window that we have already this company
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
        <SettingsWindow user={user} setShowSettings={setShowSettings} />
      )}
    </div>
  );
};

export default Main;
