import {
  ADD_NEW_EPISODE_FAIL,
  ADD_NEW_EPISODE_REQUEST,
  ADD_NEW_EPISODE_RESET,
  ADD_NEW_EPISODE_SUCCESS,
  DELETE_EPISODE_FAIL,
  DELETE_EPISODE_REQUEST,
  DELETE_EPISODE_SUCCESS,
  EDIT_EPISODE_FAIL,
  EDIT_EPISODE_REQUEST,
  EDIT_EPISODE_RESET,
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

export const addNewEpisodeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_EPISODE_REQUEST:
      return {
        loading: true,
      };
    case ADD_NEW_EPISODE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_NEW_EPISODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_NEW_EPISODE_RESET:
      return {};
    default:
      return state;
  }
};

export const editEpisodeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_EPISODE_REQUEST:
      return {
        loading: true,
      };
    case EDIT_EPISODE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_EPISODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_EPISODE_RESET:
      return {};
    default:
      return state;
  }
};

export const getEpisodeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EPISODE_REQUEST:
      return {
        loading: true,
      };
    case GET_EPISODE_SUCCESS:
      return {
        loading: false,
        episode: action.payload,
      };
    case GET_EPISODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getEpisodesReducer = (state = { episodes: [] }, action) => {
  switch (action.type) {
    case GET_EPISODES_REQUEST:
      return {
        loading: true,
      };
    case GET_EPISODES_SUCCESS:
      return {
        loading: false,
        episodes: action.payload,
      };
    case GET_EPISODES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getHighestRatedEpisodesReducer = (
  state = { highestRatedEpisodes: [] },
  action
) => {
  switch (action.type) {
    case GET_HIGHEST_RATED_EPISODES_REQUEST:
      return {
        loading: true,
      };
    case GET_HIGHEST_RATED_EPISODES_SUCCESS:
      return {
        loading: false,
        highestRatedEpisodes: action.payload,
      };
    case GET_HIGHEST_RATED_EPISODES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getEpisodesFromTheLatestSeasonReducer = (
  state = { episodesFromTheLatestSeason: [] },
  action
) => {
  switch (action.type) {
    case GET_EPISODES_FROM_THE_LATEST_SEASON_REQUEST:
      return {
        loading: true,
      };
    case GET_EPISODES_FROM_THE_LATEST_SEASON_SUCCESS:
      return {
        loading: false,
        episodesFromTheLatestSeason: action.payload.episodes,
        seasonNum: action.payload.seasonNum,
      };
    case GET_EPISODES_FROM_THE_LATEST_SEASON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteEpisodeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EPISODE_REQUEST:
      return {
        loading: true,
      };
    case DELETE_EPISODE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EPISODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
