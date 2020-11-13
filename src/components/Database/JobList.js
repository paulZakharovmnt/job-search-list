import React from "react";
import Job from "./Job";
import "./JobList.css";

const JobList = ({
  applicationsAllIds,
  applicationsById,
  searchInputValue,
  handleDeleteApplicationClick,
  handleOpenEditJobModalClick,
}) => {
  const filteredJobList = applicationsAllIds.filter((company) => {
    return company.toLowerCase().includes(searchInputValue.toLowerCase());
  });
  return (
    <ul className="job-list">
      <li className="job-header">
        <p>Company Name</p>
        <p>City</p>
        <p>Date</p>
        <p>Source</p>
        <p>Result</p>
        <p>Edit/Delete</p>
      </li>
      {filteredJobList.map((company) => {
        return (
          <Job
            company={company}
            applicationsById={applicationsById}
            key={company}
            handleDeleteApplicationClick={handleDeleteApplicationClick}
            handleOpenEditJobModalClick={handleOpenEditJobModalClick}
          />
        );
      })}
    </ul>
  );
};

export default JobList;
