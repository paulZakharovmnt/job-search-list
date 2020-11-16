import database from "../firebase";

const setUpdatedListOfResultsToFB = (user, listOfResultsFromSelectorMenu) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("results")
    .set({ listOfResultsFromSelectorMenu });
};

export default setUpdatedListOfResultsToFB;
