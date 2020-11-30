import React, { useEffect, useState, useContext } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import EditItem from "./EditItem/EditItem";
import SettingsModal from "../Settings/SettingsModal";

import setApplicationsAllIdsToFB from "../../core/setToFBFunctions/setApplicationsAllIdsToFB";
import setApplicationsByIdToFB from "../../core/setToFBFunctions/setApplicationsByIdToFB";
import fetchApplicationsAllIds from "../../core/getFromFBFunctions/fetchApplicationsAllIds";
import fetchApplicationsById from "../../core/getFromFBFunctions/fetchApplicationsById";
import getListOfSourcesFromFB from "../../core/getFromFBFunctions/getListOfSourcesFromFB";
import getListOfResultsFromFB from "../../core/getFromFBFunctions/getListOfResultsFromFB";
import getListOfCitiesFromFB from "../../core/getFromFBFunctions/getListOfCitiesFromFB";

import applicationContext from "../../context/applications-context/application-context";
import settingsContext from "../../context/settings-context/settings-context";

const Main = ({ user, showFrenchLanguage }) => {
  const [currentlyUpdatedJob, setCurrentlyUpdatedJob] = useState(null);

  const [showAddNewJobTab, setShowAddNewJobTab] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");

  const {
    applicationsById,
    applicationsAllIds,
    setApplicationAllIdsFromFB,
    setApplicationsByIdFromFB,
    addApplicationToState,
    updateApplication,
    deleteApplication,
  } = useContext(applicationContext);

  const {
    setCitiesOptionFromFB,
    setResultsOptionFromFB,
    setSourcesOptionFromFB,
  } = useContext(settingsContext);

  useEffect(() => {
    fetchApplicationsById(user).onSnapshot((doc) => {
      setApplicationsByIdFromFB(doc.data());
    });

    fetchApplicationsAllIds(user).onSnapshot((doc) => {
      if (!doc.data().companyList) {
        return;
      }
      setApplicationAllIdsFromFB(doc.data().companyList);
    });

    getListOfCitiesFromFB(user).onSnapshot((response) => {
      setCitiesOptionFromFB(response.data().listOfCitiesFromSelectorMenu);
    });
    getListOfResultsFromFB(user).onSnapshot((response) => {
      setResultsOptionFromFB(response.data().listOfResultsFromSelectorMenu);
    });
    getListOfSourcesFromFB(user).onSnapshot((response) => {
      setSourcesOptionFromFB(response.data().listOfSourcesFromSelectorMenu);
    });
  }, [user]);

  useEffect(() => {
    if (applicationsAllIds.length > 0) {
      setApplicationsAllIdsToFB(user, applicationsAllIds);
    }
    if (applicationsById) {
      setApplicationsByIdToFB(user, applicationsById);
    }
  }, [user, applicationsAllIds, applicationsById]);

  const handleDeleteApplicationClick = (company) => {
    deleteApplication(company);
  };

  const handleAddJobToListSubmit = (application) => {
    addApplicationToState(application);
    toggleShowJobsListTabClick();
  };

  const toggleShowJobAddTabClick = () => {
    setShowAddNewJobTab(true);
    setShowSettings(false);
  };

  const toggleShowJobsListTabClick = () => {
    setShowAddNewJobTab(false);
    setShowSettings(false);
  };

  const closeEditJobModal = () => {
    setShowEditJobModal(false);
    setCurrentlyUpdatedJob(null);
  };

  const handleOpenEditJobModalClick = (event, application) => {
    event.preventDefault();
    setCurrentlyUpdatedJob(application);
    setShowEditJobModal(true);
  };

  const handleAddNewCommentToApplicationSubmit = (updatedJobCopy) => {
    updateApplication(updatedJobCopy);
  };

  return (
    <div className="main-container">
      <Nav
        toggleShowJobAddTabClick={toggleShowJobAddTabClick}
        toggleShowJobsListTabClick={toggleShowJobsListTabClick}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showAddNewJobTab={showAddNewJobTab}
        showFrenchLanguage={showFrenchLanguage}
      />
      <div className="info-container">
        {showAddNewJobTab ? (
          <AddNewJob
            handleAddJobToListSubmit={handleAddJobToListSubmit}
            applicationsAllIds={applicationsAllIds}
            applicationsById={applicationsById}
            handleOpenEditJobModalClick={handleOpenEditJobModalClick}
          />
        ) : (
          <JobList
            searchInputValue={searchInputValue}
            handleDeleteApplicationClick={handleDeleteApplicationClick}
            handleOpenEditJobModalClick={handleOpenEditJobModalClick}
            showFrenchLanguage={showFrenchLanguage}
          />
        )}

        {showEditJobModal && (
          <EditItem // item
            currentlyUpdatedJob={currentlyUpdatedJob}
            closeEditJobModal={closeEditJobModal}
            handleAddNewCommentToApplicationSubmit={
              handleAddNewCommentToApplicationSubmit
            }
            showFrenchLanguage={showFrenchLanguage}
          />
        )}

        {showSettings && <SettingsModal setShowSettings={setShowSettings} />}
      </div>
    </div>
  );
};

export default Main;
