const citiesSelectorOptionReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CITIES_OPTION_TO_STATE":
      return action.payload;
    case "ADD_NEW_CITY":
      return [...state, action.payload];
    case "DELETE_SELECTED_CITY":
      return state.filter((cityName) => cityName !== action.payload);
    default:
      return state;
  }
};

export default citiesSelectorOptionReducer;
