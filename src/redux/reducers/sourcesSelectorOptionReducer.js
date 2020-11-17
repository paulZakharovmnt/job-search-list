const sourcesSelectorOptionReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SOURCES_OPTION_TO_STATE":
      return action.payload;
    case "ADD_NEW_SOURCE":
      return [...state, action.payload];
    case "DELETE_SELECTED_SOURCE":
      return state.filter((sourceName) => sourceName !== action.payload);
    default:
      return state;
  }
};

export default sourcesSelectorOptionReducer;
