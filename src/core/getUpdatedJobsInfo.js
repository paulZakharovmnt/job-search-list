import React from "react";

const getUpdatedJobsInfo = (fullJobsInfoList, company) => {
  return Object.keys(fullJobsInfoList).reduce((obj, key) => {
    if (key !== company) {
      obj[key] = fullJobsInfoList[key];
    }
    return obj;
  }, {});
};

export default getUpdatedJobsInfo;
