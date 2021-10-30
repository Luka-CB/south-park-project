import axios from "axios";
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

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users", user, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRatedEpisodes = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RATED_EPISODES_REQUEST });

    const { data } = await axios.get("/api/users/rated_episodes");

    dispatch({ type: GET_RATED_EPISODES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RATED_EPISODES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFavoriteEpisodes = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FAVORITE_EPISODES_REQUEST });

    const { data } = await axios.get("/api/users/favorite_episodes");

    dispatch({ type: GET_FAVORITE_EPISODES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_EPISODES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get("/api/users/user");

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    await axios.get("/api/users/logout");

    dispatch({ type: LOGOUT_USER_SUCCESS });

    localStorage.removeItem("userInfo");
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users/login", user, config);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const update = (user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/users/update", user, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });

    await axios.delete("/api/users/delete_account");

    dispatch({ type: DELETE_ACCOUNT_SUCCESS });

    localStorage.removeItem("userInfo");
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
