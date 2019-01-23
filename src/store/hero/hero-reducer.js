import * as types from "./hero-actions";

let initialState = {
  heroes: [],
  fetching: false,
  error: ""
};

export const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_HEROES_REQUEST:
      return { ...state, fetching: true };
    case types.LOAD_HEROES_SUCCESS:
      return { ...state, fetching: false, heroes: action.payload };
    case types.LOAD_HEROES_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.CREATE_HERO_REQUEST:
      return { ...state, fetching: true };
    case types.CREATE_HERO_SUCCESS:
      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      };
    case types.CREATE_HERO_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.UPDATE_HERO_REQUEST:
      return { ...state, fetching: true };
    case types.UPDATE_HERO_SUCCESS:
      return {
        ...state,
        fetching: false,
        heroes: state.heroes.map(hero =>
          hero.id === action.payload.id ? action.payload : hero
        )
      };
    case types.UPDATE_HERO_FAIL:
      return { ...state, fetching: false, error: action.payload };
    case types.DELETE_HERO_REQUEST:
      return { ...state, fetching: true };
    case types.DELETE_HERO_SUCCESS:
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload),
        fetching: false
      };
    case types.DELETE_HERO_FAIL:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};
