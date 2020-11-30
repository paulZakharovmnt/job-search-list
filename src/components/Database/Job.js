import React from "react";

const Job = ({
  company,
  applicationsById,
  handleDeleteApplicationClick,
  handleOpenEditJobModalClick,
}) => {
  const application = applicationsById[company];
  return (
    <div className="job">
      <h4 className="joblist-job-title">{company}</h4>
      <p className="joblist-job-title city">{application.city}</p>
      <p className="joblist-job-title date">{application.date}</p>
      <p className="joblist-job-title source">{application.source}</p>
      <p className="joblist-job-title result">{application.result}</p>
      <div className="icons">
        <i
          onClick={(event) => handleOpenEditJobModalClick(event, application)}
          className="job-edit-btn fas fa-edit"
        ></i>
        <i
          onClick={() => {
            handleDeleteApplicationClick(company);
          }}
          className="job-delete-btn fas fa-trash-alt"
        ></i>
      </div>
    </div>
  );
};

export default Job;
