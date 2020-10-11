import React from "react";
import Job from "./Job";
import "./JobList.css";

const JobList = ({
  listOfCompanies,
  fullJobsInfoList,
  userInputSearch,
  handleDeleteCompany,
  editJob,
}) => {
  // if (!listOfCompanies) {
  //   return null;
  // }
  const filteredJObList = listOfCompanies.filter((company) => {
    return company.toLowerCase().includes(userInputSearch.toLowerCase());
  });
  return (
    <ul className="job-list">
      <li className="job-header">
        <p>Company Name</p>
        <p>City</p>
        <p>Date</p>
        <p>Source</p>
        <p>Result</p>
        <p>Comment</p>
        <p>Edit/Delete</p>
      </li>
      {filteredJObList.map((company) => {
        return (
          <Job
            company={company}
            fullJobsInfoList={fullJobsInfoList}
            key={company}
            handleDeleteCompany={handleDeleteCompany}
            editJob={editJob}
          />
        );
      })}
    </ul>
  );
};

export default JobList;
