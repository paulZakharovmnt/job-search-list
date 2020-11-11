import database from "../firebase";

const setJobsInformationListToFB = (user, fullInfoCompaniesList) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("fullJobsInfo")
    .set(fullInfoCompaniesList);
};

export default setJobsInformationListToFB;
