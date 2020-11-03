import database from "../firebase";

const getListOfCitiesFromFB = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("cities");
};

export default getListOfCitiesFromFB;
