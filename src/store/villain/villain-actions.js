/*
 * action types
 */

import {
  addVillain,
  getVillains,
  removeVillain,
  updateVillain
} from "./villain-service";

export const LOAD_VILLAINS_REQUEST = "LOAD_VILLAINS_REQUEST";
export const LOAD_VILLAINS_SUCCESS = "LOAD_VILLAINS_SUCCESS";
export const LOAD_VILLAINS_FAIL = "LOAD_VILLAINS_FAIL";

export const CREATE_VILLAIN_REQUEST = "CREATE_VILLAIN_REQUEST";
export const CREATE_VILLAIN_SUCCESS = "CREATE_VILLAIN_SUCCESS";
export const CREATE_VILLAIN_FAIL = "CREATE_VILLAIN_FAIL";

export const UPDATE_VILLAIN_REQUEST = "UPDATE_VILLAIN_REQUEST";
export const UPDATE_VILLAIN_SUCCESS = "UPDATE_VILLAIN_SUCCESS";
export const UPDATE_VILLAIN_FAIL = "UPDATE_VILLAIN_FAIL";

export const DELETE_VILLAIN_REQUEST = "DELETE_VILLAIN_REQUEST";
export const DELETE_VILLAIN_SUCCESS = "DELETE_VILLAIN_SUCCESS";
export const DELETE_VILLAIN_FAIL = "DELETE_VILLAIN_FAIL";

/*
 * action creators
 */
export const loadVillains = () => {
  return async dispatch => {
    dispatch({
      type: LOAD_VILLAINS_REQUEST
    });
    try {
      const { data, status } = await getVillains();
      dispatch({ type: LOAD_VILLAINS_SUCCESS, status, payload: data });
    } catch (error) {
      dispatch({
        type: LOAD_VILLAINS_FAIL,
        payload: error.toString()
      });
    }
  };
};
export const postVillain = villain => {
  return async dispatch => {
    dispatch({
      type: CREATE_VILLAIN_REQUEST
    });
    try {
      await addVillain(villain);
      dispatch({ type: CREATE_VILLAIN_SUCCESS, payload: villain });
    } catch (error) {
      dispatch({
        type: CREATE_VILLAIN_FAIL,
        payload: error.toString()
      });
    }
  };
};

export const putVillain = villain => {
  return async dispatch => {
    dispatch({
      type: UPDATE_VILLAIN_REQUEST
    });
    try {
      await updateVillain(villain);
      dispatch({ type: UPDATE_VILLAIN_SUCCESS, payload: villain });
    } catch (error) {
      dispatch({
        type: UPDATE_VILLAIN_FAIL,
        payload: error.toString()
      });
    }
  };
};

export const deleteVillain = id => {
  return async dispatch => {
    dispatch({
      type: DELETE_VILLAIN_REQUEST
    });
    try {
      await removeVillain(id);
      dispatch({ type: DELETE_VILLAIN_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_VILLAIN_FAIL,
        payload: error.toString()
      });
    }
  };
};
