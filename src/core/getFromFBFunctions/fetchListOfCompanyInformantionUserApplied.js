import database from "../firebase";
const fetchListOfCompanyInfoUserApplied = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("fullJobsInfo");
};

export default fetchListOfCompanyInfoUserApplied;
