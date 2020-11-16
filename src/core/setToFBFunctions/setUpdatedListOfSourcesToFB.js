import database from "../firebase";

const setUpdatedListOfSourcesToFB = (user, listOfSourcesFromSelectorMenu) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("sources")
    .set({ listOfSourcesFromSelectorMenu });
};

export default setUpdatedListOfSourcesToFB;
