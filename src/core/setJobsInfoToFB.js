import database from "./firebase";

const setJobsInfoToFB = (user, fullJobsInfoList) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("fullJobsInfo")
    .set(fullJobsInfoList);
};

export default setJobsInfoToFB;
