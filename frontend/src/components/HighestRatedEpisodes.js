import React, { useEffect } from "react";
import { MdStar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getHighestRatedEpisodes } from "../actions/episodeActions";
import { NoticeMsg } from "./Messages";
import { Spinner } from "./Spinner";

const HomePageLists = () => {
  const { highestRatedEpisodes, loading: highestLoading } = useSelector(
    (state) => state.getHighestRatedEpisodes
  );

  const { userRatings } = useSelector((state) => state.getUserRating);

  const dispatch = useDispatch();

  const router = useHistory();

  useEffect(() => {
    dispatch(getHighestRatedEpisodes());
  }, [dispatch]);

  return (
    <div className="user_episodes_container">
      <div className="header">
        <h1>Highest Rated Episodes</h1>
      </div>
      <div className="user_episodes">
        {highestRatedEpisodes && highestRatedEpisodes.length === 0 && (
          <NoticeMsg msg={"No Highest Rated Episodes!"} />
        )}
        {highestLoading && <Spinner />}
        {highestRatedEpisodes &&
          highestRatedEpisodes.map((highEp) => (
            <div
              key={highEp.id}
              className="episodes"
              onClick={() => router.push(`/episode/${highEp.id}`)}
            >
              <img src={highEp.thumbnail} alt={highEp.title} />
              <div className="info">
                <h3>{highEp.title}</h3>
                <div className="ratings">
                  <div className="avg_rating">
                    <MdStar className="avg_star" />
                    <span>
                      {highEp.avgRating > 0 ? highEp.avgRating.toFixed(1) : 0}
                    </span>
                  </div>
                  <div>
                    {userRatings &&
                      userRatings.map((ur) => (
                        <div key={ur.id} className="user_rating">
                          {ur.belongsId === highEp.id && (
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

export default HomePageLists;
