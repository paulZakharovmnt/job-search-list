import React from "react";

const Job = ({
  company,
  applicationsById,
  handleDeleteApplicationClick,
  handleOpenEditJobModalClick,
}) => {
  const jobInfo = applicationsById[company];
  return (
    <li className="job">
      <h4 className="joblist-job-title">{company}</h4>
      <p className="joblist-job-title">{jobInfo.city}</p>
      <p className="joblist-job-title">{jobInfo.date}</p>
      <p className="joblist-job-title">{jobInfo.source}</p>
      <p className="joblist-job-title">{jobInfo.result}</p>
      <div className="icons">
        <i
          onClick={() => handleOpenEditJobModalClick(jobInfo)}
          className="job-edit-btn fas fa-edit"
        ></i>
        <i
          onClick={() => {
            handleDeleteApplicationClick(company);
          }}
          className="job-delete-btn fas fa-trash-alt"
        ></i>
      </div>
    </li>
  );
};

export default Job;
