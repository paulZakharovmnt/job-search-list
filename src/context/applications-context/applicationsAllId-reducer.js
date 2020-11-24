import {
  SET_APPLICATIONS_FROM_FB,
  ADD_NEW_APPLICATION,
  DELETE_APPLICATION,
} from "./applications-actions";

const applicationsAllIdsReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case SET_APPLICATIONS_FROM_FB:
      return action.payload;

    case ADD_NEW_APPLICATION:
      updatedState = [...state, action.payload.company];
      return updatedState;

    case DELETE_APPLICATION:
      updatedState = state.filter(
        (applicationId) => applicationId !== action.payload
      );
      return updatedState;

    default:
      return state;
  }
};

export default applicationsAllIdsReducer;
