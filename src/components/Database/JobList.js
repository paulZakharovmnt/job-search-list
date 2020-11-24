import React, { useContext } from "react";
import Job from "./Job";
import "./JobList.css";
import applicationContext from "../../context/applications-context/application-context";

const JobList = ({
  searchInputValue,
  handleDeleteApplicationClick,
  handleOpenEditJobModalClick,
}) => {
  const { applicationsAllIds, applicationsById } = useContext(
    applicationContext
  );

  const filteredApplications = applicationsAllIds.filter((company) => {
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
      {filteredApplications.map((company) => {
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
