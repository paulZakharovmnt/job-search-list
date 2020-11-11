import React from "react";
import Job from "./Job";
import "./JobList.css";

const JobList = ({
  listOfCompaniesNames,
  fullInfoCompaniesList,
  userInputSearch,
  handleDeleteCompanyFromList,
  handleOpenEditJobWindowClick,
}) => {
  const filteredJobList = listOfCompaniesNames.filter((company) => {
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
        <p>Edit/Delete</p>
      </li>
      {filteredJobList.map((company) => {
        return (
          <Job
            company={company}
            fullInfoCompaniesList={fullInfoCompaniesList}
            key={company}
            handleDeleteCompanyFromList={handleDeleteCompanyFromList}
            handleOpenEditJobWindowClick={handleOpenEditJobWindowClick}
          />
        );
      })}
    </ul>
  );
};

export default JobList;
