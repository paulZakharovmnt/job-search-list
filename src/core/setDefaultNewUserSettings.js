import database from "./firebase";

const setDefaultNewUserSettings = (userId) => {
  const sourcesListWhereUserIsApplying = ["LinkedIn", "Indeed", "GlassDoor"];
  const citiesListWhereUserIsApplying = ["Montreal", "Toronto"];
  const resultsListOfInterviews = ["Sent", "Reject", "Offer"];
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
    .set({ citiesListWhereUserIsApplying });
  database
    .collection("users")
    .doc(userId)
    .collection("settings")
    .doc("results")
    .set({ resultsListOfInterviews });
  database
    .collection("users")
    .doc(userId)
    .collection("settings")
    .doc("sources")
    .set({ sourcesListWhereUserIsApplying });
};

export default setDefaultNewUserSettings;
