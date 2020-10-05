import React, { useState } from "react";
import AddNewJob from "./AddNewJob";

const Main = () => {
  const [fullJobsList, setFullJobsList] = useState({});
  const [listOfCompanies, setListOfCompanies] = useState([]);

  const handleAddJobToList = (job) => {
    const newFullList = { ...fullJobsList };
    newFullList[job.company] = job;
    setFullJobsList(newFullList);

    if (listOfCompanies.includes(job.company)) {
      return;
      // Here should be POPUP window that we have already this company
    }
    setListOfCompanies([...listOfCompanies, job.company]);
  };
  return (
    <div>
      <AddNewJob handleAddJobToList={handleAddJobToList} />
    </div>
  );
};

export default Main;
