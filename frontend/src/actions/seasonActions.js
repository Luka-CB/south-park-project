import axios from "axios";
import {
  CREATE_SEASONS_FAIL,
  CREATE_SEASONS_REQUEST,
  CREATE_SEASONS_SUCCESS,
  GET_SEASONS_BY_NUM_FAIL,
  GET_SEASONS_BY_NUM_REQUEST,
  GET_SEASONS_BY_NUM_SUCCESS,
  GET_SEASONS_FAIL,
  GET_SEASONS_REQUEST,
  GET_SEASONS_SUCCESS,
  UPDATE_SEASONS_FAIL,
  UPDATE_SEASONS_REQUEST,
  UPDATE_SEASONS_SUCCESS,
} from "../constants/seasonConstants";

export const getSeasons = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SEASONS_REQUEST });

    const { data } = await axios.get("/api/seasons/get");

    dispatch({ type: GET_SEASONS_SUCCESS, payload: data });

    localStorage.setItem("seasons", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_SEASONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSeason = (seasonData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SEASONS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/seasons/create", seasonData, config);

    dispatch({ type: CREATE_SEASONS_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_SEASONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSeason = (seasonData, num) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SEASONS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/seasons/${num}/update`, seasonData, config);

    dispatch({ type: UPDATE_SEASONS_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_SEASONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSeason = (num) => async (dispatch) => {
  try {
    dispatch({ type: GET_SEASONS_BY_NUM_REQUEST });

    const { data } = await axios.get(`/api/seasons/${num}`);

    dispatch({ type: GET_SEASONS_BY_NUM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SEASONS_BY_NUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
