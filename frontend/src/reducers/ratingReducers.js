import {
  DELETE_RATING_FAIL,
  DELETE_RATING_REQUEST,
  DELETE_RATING_SUCCESS,
  GET_AVERAGE_RATING_FAIL,
  GET_AVERAGE_RATING_REQUEST,
  GET_AVERAGE_RATING_SUCCESS,
  GET_RATING_FAIL,
  GET_RATING_REQUEST,
  GET_RATING_SUCCESS,
  GET_USER_RATING_FAIL,
  GET_USER_RATING_REQUEST,
  GET_USER_RATING_SUCCESS,
  MAKE_RATE_FAIL,
  MAKE_RATE_REQUEST,
  MAKE_RATE_SUCCESS,
} from "../constants/ratingConstants";

export const makeRateReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_RATE_REQUEST:
      return {
        loading: true,
      };
    case MAKE_RATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MAKE_RATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RATING_REQUEST:
      return {
        loading: true,
      };
    case GET_RATING_SUCCESS:
      return {
        loading: false,
        rating: action.payload,
      };
    case GET_RATING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RATING_REQUEST:
      return {
        loading: true,
      };
    case DELETE_RATING_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_RATING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAverageRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AVERAGE_RATING_REQUEST:
      return {
        loading: true,
      };
    case GET_AVERAGE_RATING_SUCCESS:
      return {
        loading: false,
        avg: action.payload,
      };
    case GET_AVERAGE_RATING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_RATING_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_RATING_SUCCESS:
      return {
        loading: false,
        userRatings: action.payload,
      };
    case GET_USER_RATING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
