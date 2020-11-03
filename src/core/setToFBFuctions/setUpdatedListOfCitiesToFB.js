import database from "../firebase";

const setUpdatedListOfCitiesToFB = (user, citiesListWhereUserIsApplying) => {
  database
    .collection("users")
    .doc(user.uid)
    .collection("settings")
    .doc("cities")
    .set({ citiesListWhereUserIsApplying });
};

export default setUpdatedListOfCitiesToFB;
