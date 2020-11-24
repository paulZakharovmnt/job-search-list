import {
  SET_APPLICATIONS_FROM_FB,
  ADD_NEW_APPLICATION,
  DELETE_APPLICATION,
} from "./applications-actions";
import deleteSelectedJobInfoFromList from "../../core/deleteSelectedJobInfoFromList";

export const applicationsByIdReducer = (state, action) => {
  switch (action.type) {
    case SET_APPLICATIONS_FROM_FB:
      return action.payload;

    case ADD_NEW_APPLICATION:
      const applicationsByIdCopy = { ...state };
      applicationsByIdCopy[action.payload.company] = action.payload;
      return applicationsByIdCopy;

    case DELETE_APPLICATION:
      const applicationsByIdWithoutDeletedCompany = deleteSelectedJobInfoFromList(
        state,
        action.payload
      );
      return applicationsByIdWithoutDeletedCompany;

    default:
      return state;
  }
};

export default applicationsByIdReducer;
