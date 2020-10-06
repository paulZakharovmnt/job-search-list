import React, { useState } from "react";
import Nav from "../Nav/Nav";
import AddNewJob from "./AddNewJob";
import JobList from "./JobList";

const Main = () => {
  const [userAddingNewJob, setUserAddingNewJob] = useState(true);
  const [fullJobsInfoList, setfullJobsInfoList] = useState({});
  const [listOfCompanies, setListOfCompanies] = useState([]);

  const [userInputSearch, setUserInputSearch] = useState("");

  const showJobAddScreen = () => {
    setUserAddingNewJob(true);
  };

  const showJobListPage = () => {
    setUserAddingNewJob(false);
  };

  const handleAddJobToList = (job) => {
    const newFullList = { ...fullJobsInfoList };
    newFullList[job.company] = job;
    setfullJobsInfoList(newFullList);

    if (listOfCompanies.includes(job.company)) {
      return;
      // Here should be POPUP window that we have already this company
    }
    setListOfCompanies([...listOfCompanies, job.company]);
    showJobListPage();
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
