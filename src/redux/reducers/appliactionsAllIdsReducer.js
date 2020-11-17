const appliactionsAllIdsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_APPLICATIONS_ALL_IDS_TO_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default appliactionsAllIdsReducer;
