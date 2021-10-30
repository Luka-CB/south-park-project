import React, { useEffect } from "react";
import { MdStar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getEpisodesFromTheLatestSeason } from "../actions/episodeActions";
import { NoticeMsg } from "./Messages";
import { Spinner } from "./Spinner";

const EpisodesFromTheLatestSeason = () => {
  const {
    episodesFromTheLatestSeason,
    seasonNum,
    loading: latestLoading,
  } = useSelector((state) => state.getEpisodesFromTheLatestSeason);

  //   console.log(episodesFromTheLatestSeason);

  const { userRatings } = useSelector((state) => state.getUserRating);

  const dispatch = useDispatch();

  const router = useHistory();

  useEffect(() => {
    dispatch(getEpisodesFromTheLatestSeason());
  }, [dispatch]);

  return (
    <div className="user_episodes_container">
      <div className="header">
        <h1>Episodes from the Latest Season</h1>
        <Link to={`/seasons/${seasonNum}`}>
          <span>See full list</span>
        </Link>
      </div>
      <div className="user_episodes">
        {episodesFromTheLatestSeason &&
          episodesFromTheLatestSeason.length === 0 && (
            <NoticeMsg msg={"No Episodes From The Latest Season!"} />
          )}
        {latestLoading && <Spinner />}
        {episodesFromTheLatestSeason &&
          episodesFromTheLatestSeason.map((latestEp) => (
            <div
              key={latestEp.id}
              className="episodes"
              onClick={() => router.push(`/episode/${latestEp.id}`)}
            >
              <img src={latestEp.thumbnail} alt={latestEp.title} />
              <div className="info">
                <h3>{latestEp.title}</h3>
                <div className="ratings">
                  <div className="avg_rating">
                    <MdStar className="avg_star" />
                    <span>
                      {latestEp.avgRating > 0
                        ? latestEp.avgRating.toFixed(1)
                        : 0}
                    </span>
                  </div>
                  <div>
                    {userRatings &&
                      userRatings.map((ur) => (
                        <div key={ur.id} className="user_rating">
                          {ur.belongsId === latestEp.id && (
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
  );
};

export default EpisodesFromTheLatestSeason;
