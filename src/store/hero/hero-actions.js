/*
 * action types
 */

// export const SELECT_HEROES = "SELECT_HEROES";
import { addHero, getHeroes, removeHero, updateHero } from "./hero-service";

export const LOAD_HEROES_REQUEST = "LOAD_HEROES_REQUEST";
export const LOAD_HEROES_SUCCESS = "LOAD_HEROES_SUCCESS";
export const LOAD_HEROES_FAIL = "LOAD_HEROES_FAIL";

export const CREATE_HERO_REQUEST = "CREATE_HERO_REQUEST";
export const CREATE_HERO_SUCCESS = "CREATE_HERO_SUCCESS";
export const CREATE_HERO_FAIL = "CREATE_HERO_FAIL";

export const UPDATE_HERO_REQUEST = "UPDATE_HERO_REQUEST";
export const UPDATE_HERO_SUCCESS = "UPDATE_HERO_SUCCESS";
export const UPDATE_HERO_FAIL = "UPDATE_HERO_FAIL";

export const DELETE_HERO_REQUEST = "DELETE_HERO_REQUEST";
export const DELETE_HERO_SUCCESS = "DELETE_HERO_SUCCESS";
export const DELETE_HERO_FAIL = "DELETE_HERO_FAIL";

/*
 * action creators
 */
export const loadHeroes = () => {
  return async dispatch => {
    dispatch({
      type: LOAD_HEROES_REQUEST
    });
    try {
      const { data, status } = await getHeroes();
      dispatch({ type: LOAD_HEROES_SUCCESS, status, payload: data });
    } catch (error) {
      dispatch({
        type: LOAD_HEROES_FAIL,
        payload: error.toString()
      });
    }
  };
};

export const postHero = hero => {
  return async dispatch => {
    dispatch({
      type: CREATE_HERO_REQUEST
    });
    try {
      await addHero(hero);
      dispatch({ type: CREATE_HERO_SUCCESS, payload: hero });
    } catch (error) {
      dispatch({
        type: CREATE_HERO_FAIL,
        payload: error.toString()
      });
    }
  };
};

export const putHero = hero => {
  return async dispatch => {
    dispatch({
      type: UPDATE_HERO_REQUEST
    });
    try {
      await updateHero(hero);
      dispatch({ type: UPDATE_HERO_SUCCESS, payload: hero });
    } catch (error) {
      dispatch({
        type: UPDATE_HERO_FAIL,
        payload: error.toString()
      });
    }
  };
};

export const deleteHero = id => {
  return async dispatch => {
    dispatch({
      type: DELETE_HERO_REQUEST
    });
    try {
      await removeHero(id);
      dispatch({ type: DELETE_HERO_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_HERO_FAIL,
        payload: error.toString()
      });
    }
  };
};
