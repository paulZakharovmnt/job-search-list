import database from "../firebase";

const setApplicationsByIdToFB = (user, fullInfoCompaniesList) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("fullJobsInfo")
    .set(fullInfoCompaniesList);
};

export default setApplicationsByIdToFB;
