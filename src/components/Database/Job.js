import React from "react";

const Job = ({ company, fullJobsInfoList, handleDeleteCompany, editJob }) => {
  const jobInfo = fullJobsInfoList[company];
  return (
    <li className="job" onClick={() => editJob(jobInfo)}>
      <h4>{company}</h4>
      <p>{jobInfo.city}</p>
      <p>{jobInfo.date}</p>
      <p>{jobInfo.source}</p>
      <p>{jobInfo.result}</p>
      {/* <p>{jobInfo.comments}</p> */}
      <div className="icons">
        <i className="fas fa-edit"></i>
        <i
          onClick={() => {
            handleDeleteCompany(company);
          }}
          className="fas fa-trash-alt"
        ></i>
      </div>
    </li>
  );
};

export default Job;
