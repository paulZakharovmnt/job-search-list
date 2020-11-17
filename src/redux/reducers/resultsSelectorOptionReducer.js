const resultsSelectorOptionReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULTS_OPTION_TO_STATE":
      return action.payload;
    case "ADD_NEW_RESULT":
      return [...state, action.payload];
    case "DELETE_SELECTED_RESULT":
      return state.filter((resultName) => resultName !== action.payload);
    default:
      return state;
  }
};

export default resultsSelectorOptionReducer;
