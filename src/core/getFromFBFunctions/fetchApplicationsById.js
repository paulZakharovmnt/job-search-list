import database from "../firebase";
const fetchApplicationsById = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("fullJobsInfo");
};

export default fetchApplicationsById;
