import axios from "axios";
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

export const addVideo = (videoUrl, episodeId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_VIDEO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/api/videos/add?episodeId=${episodeId}`,
      { videoUrl },
      config
    );

    dispatch({ type: ADD_NEW_VIDEO_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_NEW_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVideo = (episodeId) => async (dispatch) => {
  try {
    dispatch({ type: GET_VIDEO_REQUEST });

    const { data } = await axios.get(`/api/videos/${episodeId}`);

    dispatch({ type: GET_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editVideo = (videoUrl, videoId) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_VIDEO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/videos/${videoId}`, { videoUrl }, config);

    dispatch({ type: EDIT_VIDEO_SUCCESS });
  } catch (error) {
    dispatch({
      type: EDIT_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VIDEO_REQUEST });

    await axios.delete(`/api/videos/${videoId}`);

    dispatch({ type: DELETE_VIDEO_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
