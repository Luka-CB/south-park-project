import {
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  GET_FAVORITE_EPISODES_FAIL,
  GET_FAVORITE_EPISODES_REQUEST,
  GET_FAVORITE_EPISODES_SUCCESS,
  GET_RATED_EPISODES_FAIL,
  GET_RATED_EPISODES_REQUEST,
  GET_RATED_EPISODES_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../constants/userConstants";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getRatedEpisodesReducer = (
  state = { ratedEpisodes: [] },
  action
) => {
  switch (action.type) {
    case GET_RATED_EPISODES_REQUEST:
      return { loading: true };
    case GET_RATED_EPISODES_SUCCESS:
      return {
        loading: false,
        ratedEpisodes: action.payload,
      };
    case GET_RATED_EPISODES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFavoriteEpisodesReducer = (
  state = { favEpisodes: [] },
  action
) => {
  switch (action.type) {
    case GET_FAVORITE_EPISODES_REQUEST:
      return { loading: true };
    case GET_FAVORITE_EPISODES_SUCCESS:
      return {
        loading: false,
        favEpisodes: action.payload,
      };
    case GET_FAVORITE_EPISODES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GET_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_USER_REQUEST:
      return { loading: true };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LOGOUT_USER_FAIL:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case LOGIN_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return { loading: true };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
