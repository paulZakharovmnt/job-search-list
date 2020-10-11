import database from "./firebase";

const setJobsListToFB = (user, companyList) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("listOfJobs")
    .set({ companyList });
};

export default setJobsListToFB;
