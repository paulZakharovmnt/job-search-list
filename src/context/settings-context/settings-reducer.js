import {
  ADD_OPTION_TO_LIST,
  DELETE_OPTION_FROM_LIST,
  SET_OPTION_FROM_FB,
} from "./settings-actions";

const optionSettingsReducer = (state, action) => {
  let updatedOptions;
  switch (action.type) {
    case SET_OPTION_FROM_FB:
      return action.payload;

    case ADD_OPTION_TO_LIST:
      updatedOptions = [...state, action.payload];
      return updatedOptions;

    case DELETE_OPTION_FROM_LIST:
      updatedOptions = state.filter((option) => option !== action.payload);
      return updatedOptions;

    default:
      return state;
  }
};

export default optionSettingsReducer;
