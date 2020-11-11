import database from "../firebase";

const setUpdatedListOfCitiesToFB = (user, listOfCitiesFromSelectorMenu) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("cities")
    .set({ listOfCitiesFromSelectorMenu });
};

export default setUpdatedListOfCitiesToFB;
