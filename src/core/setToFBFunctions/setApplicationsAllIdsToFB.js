import database from "../firebase";

const setApplicationsAllIdsToFB = (user, companyList) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("listOfJobs")
    .set({ companyList });
};

export default setApplicationsAllIdsToFB;
