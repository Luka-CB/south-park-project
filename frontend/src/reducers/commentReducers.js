import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_COMMENT_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case GET_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
