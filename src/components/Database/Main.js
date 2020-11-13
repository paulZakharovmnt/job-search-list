import React, { useEffect, useState } from "react";
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

// item, info, data, doc, result

const Main = ({ user }) => {
  const [applicationsById, setApplicationsById] = useState(null);
  const [applicationsAllIds, setApplicationsAllIds] = useState([]);
  const [currentlyUpdatedJob, setCurrentlyUpdatedJob] = useState(null);

  const [showAddNewJobTab, setShowAddNewJobTab] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    fetchApplicationsById(user).onSnapshot((doc) => {
      setApplicationsById(doc.data());
    });
    fetchApplicationsAllIds(user).onSnapshot((doc) => {
      if (!doc.data().companyList) {
        return;
      }
      setApplicationsAllIds(doc.data().companyList);
    });
  }, []);

  useEffect(() => {
    if (applicationsAllIds.length > 0) {
      setApplicationsAllIdsToFB(user, applicationsAllIds);
    }
    if (applicationsById) {
      setApplicationsByIdToFB(user, applicationsById);
    }
  }, [applicationsAllIds, applicationsById]);

  const handleDeleteApplicationClick = (company) => {
    const filteredApplicationsAllIds = applicationsAllIds.filter(
      (applicationId) => applicationId !== company // item
    );
    setApplicationsAllIds(filteredApplicationsAllIds);

    const applicationsByIdWithoutDeletedCompany = deleteSelectedJobInfoFromList(
      applicationsById,
      company
    );
    setApplicationsById(applicationsByIdWithoutDeletedCompany);

    if (applicationsAllIds.length === 1) {
      setApplicationsAllIdsToFB(user, filteredApplicationsAllIds);
    }
  };

  const handleAddJobToListSubmit = (job) => {
    const applicationsByIdCopy = { ...applicationsById }; // copy
    applicationsByIdCopy[job.company] = job;
    setApplicationsById(applicationsByIdCopy);

    if (applicationsAllIds.includes(job.company)) {
      return;
      // TODO: Here should be POPUP window that we have already this company
    }
    const applicationsAllIdsCopy = [...applicationsAllIds, job.company];
    setApplicationsAllIds(applicationsAllIdsCopy);
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

  const handleOpenEditJobModalClick = (jobInfo) => {
    setCurrentlyUpdatedJob(jobInfo);
    setShowEditJobModal(true);
  };

  const handleAddNewCommentToApplicationSubmit = (updatedJobCopy) => {
    let applicationsByIdCopy = { ...applicationsById };
    applicationsByIdCopy[updatedJobCopy.company] = updatedJobCopy;
    setApplicationsById(applicationsByIdCopy);
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
        />
      ) : (
        <JobList
          applicationsAllIds={applicationsAllIds}
          applicationsById={applicationsById}
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
