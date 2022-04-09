import React, { useEffect, useState } from "react";
import {
  MdAdd,
  MdPlayCircleOutline,
  MdDelete,
  MdEdit,
  MdStar,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import format from "date-fns/format";
import { NoticeMsg } from "./Messages";
import { DeleteModal } from "./Modals";
import { deleteEpisode, getEpisodes } from "../actions/episodeActions";
import { Spinner } from "./Spinner";
import { getUserRating } from "../actions/ratingActions";
import { Rating } from "./Rating";

const DetailBody = ({ num, seasonId }) => {
  const [idForDelete, setIdForDelete] = useState(null);
  const [idForEpisode, setIdForEpisode] = useState();
  const [rating, setRating] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const { episodes, loading: episodesLoading } = useSelector(
    (state) => state.getEpisodes
  );
  const { loading, error, success } = useSelector(
    (state) => state.deleteEpisode
  );

  const { success: makeRatingSuccess } = useSelector(
    (state) => state.makeRating
  );
  const { success: deleteRatingSuccess } = useSelector(
    (state) => state.deleteRating
  );

  const { userInfo } = useSelector((state) => state.login);

  const { userRatings } = useSelector((state) => state.getUserRating);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setShowDelModal(false);
    }

    if (makeRatingSuccess || deleteRatingSuccess) {
      setShowRating(false);
    }

    dispatch(getEpisodes(seasonId));
    dispatch(getUserRating());
  }, [success, dispatch, seasonId, makeRatingSuccess, deleteRatingSuccess]);

  const deleteHandler = (id) => {
    setShowDelModal(true);
    setIdForDelete(id);
  };

  return (
    <div className="content">
      {userInfo && userInfo.isAdmin && (
        <div className="create_episode_btn_container">
          <div
            className="create_episode_btn"
            onClick={() => history.push(`/seasons/${seasonId}/create_episode`)}
          >
            <MdAdd className="icon" />
            <span>Add New Episode</span>
          </div>
        </div>
      )}
      {episodes && episodes.length === 0 && (
        <NoticeMsg
          msg={
            userInfo && userInfo.isAdmin
              ? "No Episodes! - Please Add Episodes"
              : "No Episodes!"
          }
        />
      )}
      <DeleteModal
        show={showDelModal}
        hide={() => setShowDelModal(false)}
        onDelete={() => dispatch(deleteEpisode(idForDelete))}
        loading={loading}
        error={error}
        positionClass={"sticky"}
      />
      <Rating
        show={showRating}
        hide={() => setShowRating(false)}
        epId={idForEpisode}
        rate={rating}
        positionClass={"sticky"}
      />
      <div className="episode_list">
        {episodesLoading && <Spinner />}
        {episodes &&
          episodes.map((ep) => (
            <div key={ep.id} className="episode">
              <div className="col_1">
                <span className="index">{ep.positionNum}.</span>
                <div className="info">
                  <h1>{ep.title}</h1>
                  <div className="middle">
                    <div className="rt_container">
                      <div
                        className="rating"
                        title={
                          ep.avgRating > 0
                            ? `${ep.avgRating.toFixed(1)} Rating, Based on ${
                                ep._count.ratings
                              } Votes`
                            : "No Rating"
                        }
                      >
                        {ep.avgRating ? (
                          <span className="avg_rt">
                            {ep.avgRating !== 0 && ep.avgRating.toFixed(1)}
                          </span>
                        ) : (
                          <span className="avg_rt">0</span>
                        )}
                        <span className="divider">|</span>
                        <MdStar className="star" />
                      </div>
                      <div className="col_2">
                        {userRatings &&
                          userRatings.map((ur) => (
                            <div
                              key={ur.belongsId}
                              className="user_rating"
                              onClick={() => {
                                setShowRating(true);
                                setIdForEpisode(ep.id);
                                setRating({ rateNum: ur.rateNum, id: ur.id });
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
                  <p>{ep.description}</p>
                </div>
              </div>
              <div className="col_2">
                <div className="thumbnail">
                  <img src={ep.thumbnail} alt={ep.title} />
                  <div
                    className="icon_bg"
                    onClick={() => history.push(`/episode/${ep.id}`)}
                  >
                    <MdPlayCircleOutline className="icon" />
                  </div>
                </div>
                {userInfo && userInfo.isAdmin && (
                  <div className="config_icons">
                    <Link to={`/seasons/episode/${ep.id}/edit`}>
                      <MdEdit className="icon_edit" title="Edit Episode" />
                    </Link>
                    <MdDelete
                      onClick={() => deleteHandler(ep.id)}
                      className="icon_del"
                      title="Delete Episode"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailBody;
