import {
  ADD_TO_FAVORITE_FAIL,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_FAVORITE_FAIL,
  GET_FAVORITE_REQUEST,
  GET_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
} from "../constants/favoriteConstants";

export const addToFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE_REQUEST:
      return {
        loading: true,
      };
    case ADD_TO_FAVORITE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_TO_FAVORITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITE_REQUEST:
      return {
        loading: true,
      };
    case GET_FAVORITE_SUCCESS:
      return {
        loading: false,
        fav: action.payload,
      };
    case GET_FAVORITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const removeFavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_FAVORITE_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_FAVORITE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_FAVORITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
