import React from "react";

const Job = ({
  company,
  fullInfoCompaniesList,
  handleDeleteCompanyFromList,
  handleOpenEditJobWindowClick,
}) => {
  const jobInfo = fullInfoCompaniesList[company];
  return (
    <li className="job" onClick={() => handleOpenEditJobWindowClick(jobInfo)}>
      <h4 className="joblist-job-title">{company}</h4>
      <p className="joblist-job-title">{jobInfo.city}</p>
      <p className="joblist-job-title">{jobInfo.date}</p>
      <p className="joblist-job-title">{jobInfo.source}</p>
      <p className="joblist-job-title">{jobInfo.result}</p>
      <div className="icons">
        <i className="job-edit-btn fas fa-edit"></i>
        <i
          onClick={() => {
            handleDeleteCompanyFromList(company);
          }}
          className="job-delete-btn fas fa-trash-alt"
        ></i>
      </div>
    </li>
  );
};

export default Job;
