import React, { useEffect, useState, useContext } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import EditItem from "./EditItem/EditItem";

import deleteSelectedJobInfoFromList from "../../core/deleteSelectedJobInfoFromList";
import setApplicationsAllIdsToFB from "../../core/setToFBFunctions/setApplicationsAllIdsToFB";
import setApplicationsByIdToFB from "../../core/setToFBFunctions/setApplicationsByIdToFB";
import fetchApplicationsAllIds from "../../core/getFromFBFunctions/fetchApplicationsAllIds";
import fetchApplicationsById from "../../core/getFromFBFunctions/fetchApplicationsById";
import SettingsModal from "../Settings/SettingsModal";
import applicationContext from "../../context/applications-context/application-context";

const Main = ({ user }) => {
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
    deleteApplication,
  } = useContext(applicationContext);

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
  }, [user]);

  useEffect(() => {
    if (applicationsAllIds.length > 0) {
      setApplicationsAllIdsToFB(user, applicationsAllIds);
    }
    if (applicationsById) {
      setApplicationsByIdToFB(user, applicationsById);
    }
  }, [applicationsAllIds, applicationsById]);

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
    // let applicationsByIdCopy = { ...applicationsById };
    // applicationsByIdCopy[updatedJobCopy.company] = updatedJobCopy;
    // setApplicationsById(applicationsByIdCopy);
  };

  return (
    <div>
      <Nav
        toggleShowJobAddTabClick={toggleShowJobAddTabClick}
        toggleShowJobsListTabClick={toggleShowJobsListTabClick}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showAddNewJobTab={showAddNewJobTab}
      />
      {showAddNewJobTab ? (
        <AddNewJob
          handleAddJobToListSubmit={handleAddJobToListSubmit}
          user={user}
          applicationsAllIds={applicationsAllIds}
          applicationsById={applicationsById}
          handleOpenEditJobModalClick={handleOpenEditJobModalClick}
        />
      ) : (
        <JobList
          searchInputValue={searchInputValue}
          handleDeleteApplicationClick={handleDeleteApplicationClick}
          handleOpenEditJobModalClick={handleOpenEditJobModalClick}
        />
      )}

      {showEditJobModal && (
        <EditItem // item
          currentlyUpdatedJob={currentlyUpdatedJob}
          closeEditJobModal={closeEditJobModal}
          handleAddNewCommentToApplicationSubmit={
            handleAddNewCommentToApplicationSubmit
          }
        />
      )}

      {showSettings && (
        <SettingsModal user={user} setShowSettings={setShowSettings} />
      )}
    </div>
  );
};

export default Main;
