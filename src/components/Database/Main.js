import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";
import database from "../../core/firebase";
import EditItem from "./EditItem/EditItem";

import UseGetInfoFromFirebase from "../../core/fetchJobInfoFromFB";
import UseFetchCompaniesListFromFB from "../../core/fetchCompaniesListFromFB";
import getUpdatedJobsInfo from "../../core/getUpdatedJobsInfo";
import setJobsListToFB from "../../core/setJobsListToFB";
import setJobsInfoToFB from "../../core/setJobsInfoToFB";

const Main = ({ user }) => {
  const [userAddingNewJob, setUserAddingNewJob] = useState(true);
  const [fullJobsInfoList, setfullJobsInfoList] = useState(null);
  const [listOfCompanies, setListOfCompanies] = useState([]);

  const [userWantsToEditItem, setUserWantsToEditItem] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

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
    if (listOfCompanies.length > 0) {
      console.log("set CompanyList");
      setJobsListToFB(user, listOfCompanies);
    }
    if (fullJobsInfoList) {
      setJobsInfoToFB(user, fullJobsInfoList);
      console.log("set Info");
    }
  }, [listOfCompanies, fullJobsInfoList]);

  const getInfoFromFirebase = () => {
    database
      .collection("users")
      .doc(user.uid)
      .collection("userData")
      .doc("fullJobsInfo")
      .onSnapshot((doc) => {
        setfullJobsInfoList(doc.data());
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
        setListOfCompanies(doc.data().companyList);
      });
  };

  const handleDeleteCompany = (company) => {
    const updatedCompanyList = listOfCompanies.filter((item) => {
      return item !== company;
    });
    setListOfCompanies(updatedCompanyList);

    const updatedJobsInfo = getUpdatedJobsInfo(fullJobsInfoList, company);
    setfullJobsInfoList(updatedJobsInfo);
    // const state = fullJobsInfoList;

    // const newState = Object.keys(state).reduce((obj, key) => {
    //   if (key !== company) {
    //     obj[key] = state[key];
    //   }
    //   return obj;
    // }, {});

    // setfullJobsInfoList(newState);

    //************** FIX IT */

    if (listOfCompanies.length === 1) {
      console.log("working");
      setJobsListToFB(user, updatedCompanyList);
    }
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
  };

  const handleEditWindowToggler = () => {
    if (userWantsToEditItem) {
      setEditingJob(null);
    }
    setUserWantsToEditItem(!userWantsToEditItem);
  };

  const handleEditJob = (jobInfo) => {
    setEditingJob(jobInfo);
    handleEditWindowToggler();
  };

  const addCommentToTheJobInfo = (updatedJob) => {
    let oldList = { ...fullJobsInfoList };
    oldList[updatedJob.company] = updatedJob;
    setfullJobsInfoList(oldList);
    setEditingJob(null);
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
          handleDeleteCompany={handleDeleteCompany}
          editJob={handleEditJob}
        />
      )}

      {userWantsToEditItem && (
        <EditItem
          editingJob={editingJob}
          handleEditWindowToggler={handleEditWindowToggler}
          addCommentToTheJobInfo={addCommentToTheJobInfo}
        />
      )}
    </div>
  );
};

export default Main;
