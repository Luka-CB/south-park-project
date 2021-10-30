import React, { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUserRating } from "../actions/ratingActions";
import { Rating } from "./Rating";

const EpisodesList = ({ episodes }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rateNum, setRateNum] = useState({});
  const [idForEpisode, setIdForEpisode] = useState(null);

  const { userRatings } = useSelector((state) => state.getUserRating);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRating());
  }, [dispatch]);

  useEffect(() => {
    if (showRatingModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [showRatingModal]);

  return (
    <>
      <Rating
        show={showRatingModal}
        hide={() => setShowRatingModal(false)}
        epId={idForEpisode}
        rate={rateNum}
        positionClass={"fixed"}
      />
      {episodes &&
        episodes.map((ep, i) => (
          <div key={ep.id} className="list">
            <span className="index">{i + 1}.</span>
            <div className="info">
              <h3 onClick={() => history.push(`/episode/${ep.id}`)}>
                {ep.title}
              </h3>
              <div className="middle">
                <div className="ratings">
                  <div
                    className="avg"
                    title={
                      ep.avgRating > 0
                        ? `${ep.avgRating.toFixed(1)} Rating, Based on ${
                            ep._count.ratings
                          } Votes`
                        : "No Rating"
                    }
                  >
                    <MdStar className="avg_star" />
                    <span>
                      {ep.avgRating > 0 ? ep.avgRating.toFixed(1) : 0}
                    </span>
                  </div>
                  <div className="col_2">
                    {userRatings &&
                      userRatings.map((ur) => (
                        <div
                          key={ur.id}
                          className="user_rating"
                          onClick={() => {
                            setShowRatingModal(true);
                            setRateNum({ rateNum: ur.rateNum });
                            setIdForEpisode(ep.id);
                          }}
                        >
                          {ur.belongsId === ep.id && (
                            <>
                              <MdStar className="user_star" />
                              <span>{ur.rateNum}</span>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                <span className="air_date">
                  {format(new Date(ep.airDate), "dd/MM/yyyy")}
                </span>
              </div>
              <p>{ep.description.substring(0, 150)}....</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default EpisodesList;
