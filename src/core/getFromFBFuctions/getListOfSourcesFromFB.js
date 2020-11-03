import database from "../firebase";

const getListOfSourcesFromFB = (user) => {
  return database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("sources");
};

export default getListOfSourcesFromFB;
