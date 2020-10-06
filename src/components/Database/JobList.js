import React from "react";
import Job from "./Job";

const JobList = ({ listOfCompanies, fullJobsInfoList, userInputSearch }) => {
  const filteredJObList = listOfCompanies.filter((company) => {
    return company.includes(userInputSearch);
  });
  return (
    <ul>
      {filteredJObList.map((company) => {
        return (
          <Job
            company={company}
            fullJobsInfoList={fullJobsInfoList}
            key={company}
          />
        );
      })}
    </ul>
  );
};

export default JobList;
