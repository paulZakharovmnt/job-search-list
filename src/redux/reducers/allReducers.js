import { combineReducers } from "redux";
import userReducer from "./userReducer";
import applicationsByIdReducer from "./applicationsByIdReducer";
import appliactionsAllIdsReducer from "./appliactionsAllIdsReducer";
import citiesSelectorOptionReducer from "./citiesSelectorOptionReducer";
import sourcesSelectorOptionReducer from "./sourcesSelectorOptionReducer";
import resultsSelectorOptionReducer from "./resultsSelectorOptionReducer";

const allReducers = combineReducers({
  user: userReducer,
  applicationsById: applicationsByIdReducer,
  applicationsAllIds: appliactionsAllIdsReducer,
  listOfCities: citiesSelectorOptionReducer,
  listOfSources: sourcesSelectorOptionReducer,
  listOfResults: resultsSelectorOptionReducer,
});

export default allReducers;
