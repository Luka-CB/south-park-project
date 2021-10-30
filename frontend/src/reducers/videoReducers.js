import {
  ADD_NEW_VIDEO_FAIL,
  ADD_NEW_VIDEO_REQUEST,
  ADD_NEW_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  EDIT_VIDEO_FAIL,
  EDIT_VIDEO_REQUEST,
  EDIT_VIDEO_SUCCESS,
  GET_VIDEO_FAIL,
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
} from "../constants/videoConstants";

export const addNewVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_VIDEO_REQUEST:
      return {
        loading: true,
      };
    case ADD_NEW_VIDEO_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_NEW_VIDEO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VIDEO_REQUEST:
      return {
        loading: true,
      };
    case GET_VIDEO_SUCCESS:
      return {
        loading: false,
        video: action.payload,
      };
    case GET_VIDEO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_VIDEO_REQUEST:
      return {
        loading: true,
      };
    case EDIT_VIDEO_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_VIDEO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VIDEO_REQUEST:
      return {
        loading: true,
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_VIDEO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
