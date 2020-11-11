import database from "./firebase";

const setDefaultNewUserSettingsToFB = (userId) => {
  const listOfSourcesFromSelectorMenu = ["LinkedIn", "Indeed", "GlassDoor"];
  const listOfCitiesFromSelectorMenu = ["Montreal", "Toronto"];
  const listOfResultsFromSelectorMenu = ["Sent", "Reject", "Offer"];

  database
    .collection("users")
    .doc(userId)
    .collection("userData")
    .doc("fullJobsInfo")
    .set({});
  database
    .collection("users")
    .doc(userId)
    .collection("userData")
    .doc("listOfJobs")
    .set({});
  database
    .collection("users")
    .doc(userId)
    .collection("settings")
    .doc("cities")
    .set({ listOfCitiesFromSelectorMenu });
  database
    .collection("users")
    .doc(userId)
    .collection("settings")
    .doc("results")
    .set({ listOfResultsFromSelectorMenu });
  database
    .collection("users")
    .doc(userId)
    .collection("settings")
    .doc("sources")
    .set({ listOfSourcesFromSelectorMenu });
};

export default setDefaultNewUserSettingsToFB;
