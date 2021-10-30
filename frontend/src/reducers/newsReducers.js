import {
  ADD_NEWS_FAIL,
  ADD_NEWS_REQUEST,
  ADD_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  EDIT_NEWS_FAIL,
  EDIT_NEWS_REQUEST,
  EDIT_NEWS_SUCCESS,
  GET_NEWS_FAIL,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_SINGLE_NEWS_FAIL,
  GET_SINGLE_NEWS_REQUEST,
  GET_SINGLE_NEWS_SUCCESS,
} from "../constants/newsConstants";

export const addNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEWS_REQUEST:
      return {
        loading: true,
      };
    case ADD_NEWS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_NEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_NEWS_SUCCESS:
      return {
        loading: false,
        news: action.payload,
      };
    case GET_NEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSingleNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_NEWS_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_NEWS_SUCCESS:
      return {
        loading: false,
        singleNews: action.payload,
      };
    case GET_SINGLE_NEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_NEWS_REQUEST:
      return {
        loading: true,
      };
    case EDIT_NEWS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_NEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NEWS_REQUEST:
      return {
        loading: true,
      };
    case DELETE_NEWS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_NEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
