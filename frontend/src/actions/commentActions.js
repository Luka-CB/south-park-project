import axios from "axios";
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

export const createComment = (text, episodeId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/comments?episodeId=${episodeId}`, { text }, config);

    dispatch({ type: CREATE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.date.message
          : error.message,
    });
  }
};

export const getComments = (episodeId) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });

    const { data } = await axios.get(`/api/comments/${episodeId}`);

    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.date.message
          : error.message,
    });
  }
};

export const editComment = (text, id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_COMMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/comments/${id}`, { text }, config);

    dispatch({ type: EDIT_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: EDIT_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.date.message
          : error.message,
    });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    await axios.delete(`/api/comments/${id}`);

    dispatch({ type: DELETE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.date.message
          : error.message,
    });
  }
};
