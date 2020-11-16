import database from "../firebase";

const getListOfResultsFromFB = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("results");
};

export default getListOfResultsFromFB;
