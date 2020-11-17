const applicationsByIdReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_APPLICATIONS_BY_ID_TO_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default applicationsByIdReducer;
