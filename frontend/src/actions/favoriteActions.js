import axios from "axios";
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

export const addToFavorite = (epId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/favorites", { epId }, config);

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_TO_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFavorite = (epId) => async (dispatch) => {
  try {
    dispatch({ type: GET_FAVORITE_REQUEST });

    const { data } = await axios.get(`/api/favorites?epId=${epId}`);

    dispatch({ type: GET_FAVORITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFavorite = (Id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FAVORITE_REQUEST });

    await axios.delete(`/api/favorites/${Id}`);

    dispatch({ type: REMOVE_FAVORITE_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
