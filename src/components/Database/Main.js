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
import getListOfCitiesFromFB from "../../core/getFromFBFunctions/getListOfCitiesFromFB";
import getListOfResultsFromFB from "../../core/getFromFBFunctions/getListOfResultsFromFB";
import getListOfSourcesFromFB from "../../core/getFromFBFunctions/getListOfSourcesFromFB";
import SettingsModal from "../Settings/SettingsModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setApplicationsAllIds,
  setApplicationsById,
  setCitySelectorOption,
  setSourceSelectorOption,
  setResultSelectorOption,
} from "../../redux/actions/actions";

const Main = ({ user }) => {
  const applicationsById = useSelector((state) => state.applicationsById);
  const applicationsAllIds = useSelector((state) => state.applicationsAllIds);
  const [currentlyUpdatedJob, setCurrentlyUpdatedJob] = useState(null);

  const [showAddNewJobTab, setShowAddNewJobTab] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApplicationsById(user).onSnapshot((response) => {
      dispatch(setApplicationsById(response.data()));
    });
    fetchApplicationsAllIds(user).onSnapshot((response) => {
      if (!response.data().companyList) {
        return;
      }
      dispatch(setApplicationsAllIds(response.data().companyList));
    });

    getListOfCitiesFromFB(user).onSnapshot((response) =>
      dispatch(
        setCitySelectorOption(response.data().listOfCitiesFromSelectorMenu)
      )
    );

    getListOfResultsFromFB(user).onSnapshot((response) =>
      dispatch(
        setResultSelectorOption(response.data().listOfResultsFromSelectorMenu)
      )
    );

    getListOfSourcesFromFB(user).onSnapshot((response) =>
      dispatch(
        setSourceSelectorOption(response.data().listOfSourcesFromSelectorMenu)
      )
    );
  }, [user]);

  useEffect(() => {
    if (applicationsAllIds.length > 0) {
      setApplicationsAllIdsToFB(user, applicationsAllIds);
    }
    if (applicationsById) {
      setApplicationsByIdToFB(user, applicationsById);
    }
  }, [applicationsAllIds, applicationsById, user]);

  const handleDeleteApplicationClick = (company) => {
    const filteredApplicationsAllIds = applicationsAllIds.filter(
      (applicationId) => applicationId !== company
    );
    dispatch(setApplicationsAllIds(filteredApplicationsAllIds));

    const applicationsByIdWithoutDeletedCompany = deleteSelectedJobInfoFromList(
      applicationsById,
      company
    );
    dispatch(setApplicationsById(applicationsByIdWithoutDeletedCompany));
    if (applicationsAllIds.length === 1) {
      setApplicationsAllIdsToFB(user, filteredApplicationsAllIds);
    }
  };

  const handleAddJobToListSubmit = (job) => {
    const applicationsByIdCopy = { ...applicationsById };
    applicationsByIdCopy[job.company] = job;
    dispatch(setApplicationsById(applicationsByIdCopy));

    if (applicationsAllIds.includes(job.company)) {
      return;
      // TODO: Here should be POPUP window that we have already this company
    }
    const applicationsAllIdsCopy = [...applicationsAllIds, job.company];
    dispatch(setApplicationsAllIds(applicationsAllIdsCopy));
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
    dispatch(setApplicationsById(applicationsByIdCopy));
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
        <EditItem
          currentlyUpdatedJob={currentlyUpdatedJob}
          closeEditJobModal={closeEditJobModal}
          handleAddNewCommentToApplicationSubmit={
            handleAddNewCommentToApplicationSubmit
          }
        />
      )}

      {showSettings && <SettingsModal setShowSettings={setShowSettings} />}
    </div>
  );
};

export default Main;
