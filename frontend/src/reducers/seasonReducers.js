import {
  CREATE_SEASONS_FAIL,
  CREATE_SEASONS_REQUEST,
  CREATE_SEASONS_RESET,
  CREATE_SEASONS_SUCCESS,
  GET_SEASONS_BY_NUM_FAIL,
  GET_SEASONS_BY_NUM_REQUEST,
  GET_SEASONS_BY_NUM_SUCCESS,
  GET_SEASONS_FAIL,
  GET_SEASONS_REQUEST,
  GET_SEASONS_SUCCESS,
  UPDATE_SEASONS_FAIL,
  UPDATE_SEASONS_REQUEST,
  UPDATE_SEASONS_RESET,
  UPDATE_SEASONS_SUCCESS,
} from "../constants/seasonConstants";

export const getSeasonsReducer = (state = { seasons: [] }, action) => {
  switch (action.type) {
    case GET_SEASONS_REQUEST:
      return {
        loading: true,
        seasons: [],
      };
    case GET_SEASONS_SUCCESS:
      return {
        loading: false,
        seasons: action.payload,
      };
    case GET_SEASONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createSeasonReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SEASONS_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SEASONS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_SEASONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SEASONS_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const updateSeasonReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SEASONS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_SEASONS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SEASONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_SEASONS_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const getSeasonReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SEASONS_BY_NUM_REQUEST:
      return {
        loading: true,
      };
    case GET_SEASONS_BY_NUM_SUCCESS:
      return {
        loading: false,
        season: action.payload,
      };
    case GET_SEASONS_BY_NUM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
