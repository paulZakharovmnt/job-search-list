import database from "../firebase";

const fetchListOfCompanyNamesUserApplied = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("userData")
    .doc("listOfJobs");
};

export default fetchListOfCompanyNamesUserApplied;
