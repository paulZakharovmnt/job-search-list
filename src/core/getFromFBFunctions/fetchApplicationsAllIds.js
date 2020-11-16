import database from "../firebase";

const fetchApplicationsAllIds = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("listOfJobs");
};

export default fetchApplicationsAllIds;
