import React from "react";

const Job = ({ company, fullJobsInfoList }) => {
  const jobInfo = fullJobsInfoList[company];
  return (
    <li>
      <h3>{company}</h3>
      {/* <h4>{jobInfo}</h4> */}
    </li>
  );
};

export default Job;
