import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteAccountReducer,
  getFavoriteEpisodesReducer,
  getRatedEpisodesReducer,
  getUserReducer,
  loginReducer,
  logoutReducer,
  registerReducer,
  updateReducer,
} from "./reducers/userReducers";
import {
  createSeasonReducer,
  getSeasonReducer,
  getSeasonsReducer,
  updateSeasonReducer,
} from "./reducers/seasonReducers";
import {
  addNewEpisodeReducer,
  deleteEpisodeReducer,
  editEpisodeReducer,
  getEpisodeReducer,
  getEpisodesFromTheLatestSeasonReducer,
  getEpisodesReducer,
  getHighestRatedEpisodesReducer,
} from "./reducers/episodeReducers";
import {
  addNewVideoReducer,
  deleteVideoReducer,
  editVideoReducer,
  getVideoReducer,
} from "./reducers/videoReducers";
import {
  createCommentReducer,
  deleteCommentReducer,
  editCommentReducer,
  getCommentsReducer,
} from "./reducers/commentReducers";
import {
  deleteRatingReducer,
  getAverageRatingReducer,
  getRatingReducer,
  getUserRatingReducer,
  makeRateReducer,
} from "./reducers/ratingReducers";
import {
  addToFavoriteReducer,
  getFavoriteReducer,
  removeFavoriteReducer,
} from "./reducers/favoriteReducers";
import {
  addNewsReducer,
  deleteNewsReducer,
  editNewsReducer,
  getNewsReducer,
  getSingleNewsReducer,
} from "./reducers/newsReducers";

const reducer = combineReducers({
  register: registerReducer,
  getRatedEpisodes: getRatedEpisodesReducer,
  getFavoriteEpisodes: getFavoriteEpisodesReducer,
  getUser: getUserReducer,
  logout: logoutReducer,
  login: loginReducer,
  update: updateReducer,
  deleteAccount: deleteAccountReducer,
  getSeasons: getSeasonsReducer,
  getSeason: getSeasonReducer,
  createSeason: createSeasonReducer,
  updateSeason: updateSeasonReducer,
  addNewEpisode: addNewEpisodeReducer,
  editEpisode: editEpisodeReducer,
  getEpisode: getEpisodeReducer,
  getEpisodes: getEpisodesReducer,
  getHighestRatedEpisodes: getHighestRatedEpisodesReducer,
  getEpisodesFromTheLatestSeason: getEpisodesFromTheLatestSeasonReducer,
  deleteEpisode: deleteEpisodeReducer,
  addNewVideo: addNewVideoReducer,
  getVideo: getVideoReducer,
  editVideo: editVideoReducer,
  deleteVideo: deleteVideoReducer,
  createComment: createCommentReducer,
  getComments: getCommentsReducer,
  editComment: editCommentReducer,
  deleteComment: deleteCommentReducer,
  makeRating: makeRateReducer,
  getRating: getRatingReducer,
  deleteRating: deleteRatingReducer,
  avgRating: getAverageRatingReducer,
  getUserRating: getUserRatingReducer,
  addToFavorite: addToFavoriteReducer,
  getFavorite: getFavoriteReducer,
  removeFavorite: removeFavoriteReducer,
  addNews: addNewsReducer,
  getNews: getNewsReducer,
  getSingleNews: getSingleNewsReducer,
  editNews: editNewsReducer,
  deleteNews: deleteNewsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const seasonsFromStorage = localStorage.getItem("seasons")
  ? JSON.parse(localStorage.getItem("seasons"))
  : null;

const initialState = {
  login: { userInfo: userInfoFromStorage },
  getSeasons: { seasons: seasonsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
