import axios from "axios";
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

export const makeRating = (rateNum, epId) => async (dispatch) => {
  try {
    dispatch({ type: MAKE_RATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/ratings?epId=${epId}`, { rateNum }, config);

    dispatch({ type: MAKE_RATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MAKE_RATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRating = (epId) => async (dispatch) => {
  try {
    dispatch({ type: GET_RATING_REQUEST });

    const { data } = await axios.get(`/api/ratings/${epId}`);

    dispatch({ type: GET_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRating = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RATING_REQUEST });

    await axios.delete(`/api/ratings/${id}`);

    dispatch({ type: DELETE_RATING_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_RATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAverageRating = (epId) => async (dispatch) => {
  try {
    dispatch({ type: GET_AVERAGE_RATING_REQUEST });

    await axios.get(`/api/ratings/avg?epId=${epId}`);

    dispatch({ type: GET_AVERAGE_RATING_SUCCESS });
  } catch (error) {
    dispatch({
      type: GET_AVERAGE_RATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserRating = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_RATING_REQUEST });

    const { data } = await axios.get(`/api/ratings/user_rating`);

    dispatch({ type: GET_USER_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_RATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
