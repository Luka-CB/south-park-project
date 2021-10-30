import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { getRatedEpisodes, getFavoriteEpisodes } from "../actions/userActions";
import { getUserRating } from "../actions/ratingActions";
import { Spinner } from "./Spinner";
import { NoticeMsg } from "./Messages";

const UserActivities = ({ username }) => {
  const { favEpisodes, loading: favEpisodesLoading } = useSelector(
    (state) => state.getFavoriteEpisodes
  );

  const { ratedEpisodes, loading: ratedEpisodesLoading } = useSelector(
    (state) => state.getRatedEpisodes
  );

  const { userRatings } = useSelector((state) => state.getUserRating);

  const dispatch = useDispatch();

  const router = useHistory();

  useEffect(() => {
    dispatch(getFavoriteEpisodes());
    dispatch(getRatedEpisodes());
    dispatch(getUserRating());
  }, [dispatch]);

  return (
    <>
      {favEpisodes && favEpisodes.length !== 0 && (
        <div className="user_episodes_container">
          <div className="header">
            <h1>Your Favorite Episodes</h1>
            <Link to={`/profile/${username}/favorite_episodes`}>
              <span>See full list</span>
            </Link>
          </div>
          <div className="user_episodes">
            {favEpisodes && favEpisodes.length === 0 && (
              <NoticeMsg msg={"You Don't Have Favorite Epiosdes"} />
            )}
            {favEpisodesLoading && <Spinner />}
            {favEpisodes &&
              favEpisodes.slice(0, 4).map((favEp) => (
                <div
                  key={favEp.id}
                  className="episodes"
                  onClick={() => router.push(`/episode/${favEp.id}`)}
                >
                  <img src={favEp.thumbnail} alt={favEp.title} />
                  <div className="info">
                    <h3>{favEp.title}</h3>
                    <div className="ratings">
                      <div className="avg_rating">
                        <MdStar className="avg_star" />
                        <span>
                          {favEp.avgRating > 0 ? favEp.avgRating.toFixed(1) : 0}
                        </span>
                      </div>
                      <div>
                        {userRatings &&
                          userRatings.map((ur) => (
                            <div key={ur.id} className="user_rating">
                              {ur.belongsId === favEp.id && (
                                <>
                                  <MdStar className="user_star" />
                                  <span>{ur.rateNum}</span>
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {ratedEpisodes && ratedEpisodes.length !== 0 && (
        <div className="user_episodes_container">
          <div className="header">
            <h1>Episodes Rated By You</h1>
            <Link to={`/profile/${username}/rated_episodes`}>
              <span>See full list</span>
            </Link>
          </div>
          <div className="user_episodes">
            {ratedEpisodes && ratedEpisodes.length === 0 && (
              <NoticeMsg msg={"You Haven't Rated Any Epiosdes Yet"} />
            )}
            {ratedEpisodesLoading && <Spinner />}
            {ratedEpisodes &&
              ratedEpisodes.slice(0, 4).map((ratedEp) => (
                <div
                  key={ratedEp.id}
                  className="episodes"
                  onClick={() => router.push(`/episode/${ratedEp.id}`)}
                >
                  <img src={ratedEp.thumbnail} alt={ratedEp.title} />
                  <div className="info">
                    <h3>{ratedEp.title}</h3>
                    <div className="ratings">
                      <div className="avg_rating">
                        <MdStar className="avg_star" />
                        <span>
                          {ratedEp.avgRating > 0
                            ? ratedEp.avgRating.toFixed(1)
                            : 0}
                        </span>
                      </div>
                      <div>
                        {userRatings &&
                          userRatings.map((ur) => (
                            <div key={ur.id} className="user_rating">
                              {ur.belongsId === ratedEp.id && (
                                <>
                                  <MdStar className="user_star" />
                                  <span>{ur.rateNum}</span>
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserActivities;
