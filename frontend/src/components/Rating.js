import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar, AiOutlineStar, AiFillCloseCircle } from "react-icons/ai";
import { useTransition, animated } from "react-spring";
import { deleteRating, getRating, makeRating } from "../actions/ratingActions";
import { SpinnerSm } from "./Spinner";
import { ErrorMsg } from "./Messages";

export const Rating = ({ show, hide, epId, rate, positionClass }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const {
    loading: makeRatingLoading,
    error: makeRatingError,
    success: makeRatingSuccess,
  } = useSelector((state) => state.makeRating);

  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteRating);

  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (deleteSuccess) {
      setRating(null);
    }

    if (makeRatingSuccess) {
      hide();
    }

    dispatch(getRating(epId));
  }, [makeRatingSuccess, deleteSuccess]);

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 100,
  });

  return (
    <>
      {transitions(
        (styles, show) =>
          show && (
            <animated.div style={styles} className="rating_bg" onClick={hide}>
              {userInfo ? (
                <div
                  className={`rating_container ${positionClass}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {makeRatingLoading && <SpinnerSm color={"light"} />}
                  {makeRatingError && <ErrorMsg msg={makeRatingError} />}
                  {deleteLoading && <SpinnerSm color={"light"} />}
                  {deleteError && <ErrorMsg msg={deleteError} />}
                  <span className={rating || rate ? "is_rate" : "rate"}>
                    {rating ? rating : rate ? rate.rateNum : "-"}
                  </span>
                  <AiFillCloseCircle className="close" onClick={hide} />
                  <div className="stars">
                    {[...Array(10)].map((star, i) => {
                      const rateVal = i + 1;

                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            name="rating"
                            value={rateVal}
                            onClick={() => setRating(rateVal)}
                          />
                          {rateVal <=
                          (hover || rating || (rate && rate.rateNum)) ? (
                            <AiFillStar
                              className="star"
                              onMouseEnter={() => setHover(rateVal)}
                              onMouseLeave={() => setHover(null)}
                            />
                          ) : (
                            <AiOutlineStar
                              className="star"
                              onMouseEnter={() => setHover(rateVal)}
                              onMouseLeave={() => setHover(null)}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                  <div className="btns">
                    <button
                      onClick={() => dispatch(makeRating(rating, epId))}
                      className="btn outline_primary"
                      disabled={!rating}
                    >
                      Rate
                    </button>
                    <button
                      onClick={() => dispatch(deleteRating(rate.id))}
                      className="btn outline_danger"
                      disabled={!rate}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="warning">
                  <h2>
                    You Must be{" "}
                    <span onClick={() => history.push("/login")}>
                      Signed In
                    </span>{" "}
                    to Rate
                  </h2>
                </div>
              )}
            </animated.div>
          )
      )}
    </>
  );
};
