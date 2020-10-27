import React from "react";
import Job from "./Job";
import "./JobList.css";

const JobList = ({
  listOfCompaniesTitles,
  fullInfoCompaniesList,
  userInputSearch,
  handleDeleteCompanyFromList,
  editJob,
}) => {
  // if (!listOfCompanies) {
  //   return null;
  // }
  const filteredJObList = listOfCompaniesTitles.filter((company) => {
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
            fullInfoCompaniesList={fullInfoCompaniesList}
            key={company}
            handleDeleteCompanyFromList={handleDeleteCompanyFromList}
            editJob={editJob}
          />
        );
      })}
    </ul>
  );
};

export default JobList;
