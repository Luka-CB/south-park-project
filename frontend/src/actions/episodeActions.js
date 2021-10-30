import axios from "axios";
import {
  ADD_NEW_EPISODE_FAIL,
  ADD_NEW_EPISODE_REQUEST,
  ADD_NEW_EPISODE_SUCCESS,
  DELETE_EPISODE_FAIL,
  DELETE_EPISODE_REQUEST,
  DELETE_EPISODE_SUCCESS,
  EDIT_EPISODE_FAIL,
  EDIT_EPISODE_REQUEST,
  EDIT_EPISODE_SUCCESS,
  GET_EPISODES_FAIL,
  GET_EPISODES_FROM_THE_LATEST_SEASON_FAIL,
  GET_EPISODES_FROM_THE_LATEST_SEASON_REQUEST,
  GET_EPISODES_FROM_THE_LATEST_SEASON_SUCCESS,
  GET_EPISODES_REQUEST,
  GET_EPISODES_SUCCESS,
  GET_EPISODE_FAIL,
  GET_EPISODE_REQUEST,
  GET_EPISODE_SUCCESS,
  GET_HIGHEST_RATED_EPISODES_FAIL,
  GET_HIGHEST_RATED_EPISODES_REQUEST,
  GET_HIGHEST_RATED_EPISODES_SUCCESS,
} from "../constants/episodeConstants";

export const addNewEpisode = (episodeData, seasonId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_EPISODE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/episodes/${seasonId}/add`, episodeData, config);

    dispatch({ type: ADD_NEW_EPISODE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_NEW_EPISODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editEpisode = (episodeData, episodeId) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_EPISODE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`/api/episodes/${episodeId}/edit`, episodeData, config);

    dispatch({ type: EDIT_EPISODE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EDIT_EPISODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEpisode = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EPISODE_REQUEST });

    const { data } = await axios.get(`/api/episodes/${id}`);

    dispatch({ type: GET_EPISODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EPISODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEpisodes = (seasonId) => async (dispatch) => {
  try {
    dispatch({ type: GET_EPISODES_REQUEST });

    const { data } = await axios.get(`/api/episodes?seasonId=${seasonId}`);

    dispatch({ type: GET_EPISODES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EPISODES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHighestRatedEpisodes = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HIGHEST_RATED_EPISODES_REQUEST });

    const { data } = await axios.get(`/api/episodes/highest_rated`);

    dispatch({ type: GET_HIGHEST_RATED_EPISODES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_HIGHEST_RATED_EPISODES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEpisodesFromTheLatestSeason = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EPISODES_FROM_THE_LATEST_SEASON_REQUEST });

    const { data } = await axios.get(`/api/episodes/latest`);

    dispatch({
      type: GET_EPISODES_FROM_THE_LATEST_SEASON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EPISODES_FROM_THE_LATEST_SEASON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEpisode = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EPISODE_REQUEST });

    await axios.delete(`/api/episodes/${id}/delete`);

    dispatch({ type: DELETE_EPISODE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_EPISODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
