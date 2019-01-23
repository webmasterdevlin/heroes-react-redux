import * as types from "./villain-actions";

let initialState = {
  villains: [],
  fetching: false,
  error: ""
};

export const villainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VILLAINS_REQUEST:
      return { ...state, fetching: true };
    case types.LOAD_VILLAINS_SUCCESS:
      return { ...state, fetching: false, villains: action.payload };
    case types.LOAD_VILLAINS_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.CREATE_VILLAIN_REQUEST:
      return { ...state, fetching: true };
    case types.CREATE_VILLAIN_SUCCESS:
      return {
        ...state,
        villains: [...state.villains, action.payload]
      };
    case types.CREATE_VILLAIN_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.UPDATE_VILLAIN_REQUEST:
      return {
        ...state,
        fetching: false
      };
    case types.UPDATE_VILLAIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        villains: state.villains.filter(
          villain => villain.id !== action.payload
        )
      };
    case types.UPDATE_VILLAIN_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.DELETE_VILLAIN_REQUEST:
      return { ...state, fetching: true };
    case types.DELETE_VILLAIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        villains: state.villains.filter(
          villain => villain.id !== action.payload
        )
      };
    case types.DELETE_VILLAIN_FAIL:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};
