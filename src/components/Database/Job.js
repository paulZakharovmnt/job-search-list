import React from "react";

const Job = ({
  company,
  fullInfoCompaniesList,
  handleDeleteCompanyFromList,
  editJob,
}) => {
  const jobInfo = fullInfoCompaniesList[company];
  return (
    <li className="job" onClick={() => editJob(jobInfo)}>
      <h4>{company}</h4>
      <p>{jobInfo.city}</p>
      <p>{jobInfo.date}</p>
      <p>{jobInfo.source}</p>
      <p>{jobInfo.result}</p>
      <div className="icons">
        <i className="fas fa-edit"></i>
        <i
          onClick={() => {
            handleDeleteCompanyFromList(company);
          }}
          className="fas fa-trash-alt"
        ></i>
      </div>
    </li>
  );
};

export default Job;
