const deleteSelectedJobInfoFromList = (fullJobsInfoList, company) => {
  return Object.keys(fullJobsInfoList).reduce((obj, key) => {
    if (key !== company) {
      obj[key] = fullJobsInfoList[key];
    }
    return obj;
  }, {});
};

export default deleteSelectedJobInfoFromList;
