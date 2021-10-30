import axios from "axios";
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

export const addNews = (newsdata) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEWS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/news", newsdata, config);

    dispatch({ type: ADD_NEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNews = (sort) => async (dispatch) => {
  try {
    dispatch({ type: GET_NEWS_REQUEST });

    const { data } = await axios.get(`/api/news?sort=${sort ? sort : "desc"}`);

    dispatch({ type: GET_NEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleNews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_NEWS_REQUEST });

    const { data } = await axios.get(`/api/news/${id}`);

    dispatch({ type: GET_SINGLE_NEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editNews = (newsData, id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_NEWS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/news/${id}`, newsData, config);

    dispatch({ type: EDIT_NEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: EDIT_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NEWS_REQUEST });

    await axios.delete(`/api/news/${id}`);

    dispatch({ type: DELETE_NEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
