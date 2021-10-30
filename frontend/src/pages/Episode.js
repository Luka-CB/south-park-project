import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdStar, MdFavorite } from "react-icons/md";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import format from "date-fns/format";
import CommentSection from "../components/CommentSection";
import {
  AddVideo,
  Config,
  DeleteModal,
  EditVideo,
  FavModal,
} from "../components/Modals";
import VideoPlayer from "../components/VideoPlayer";
import { deleteVideo, getVideo } from "../actions/videoActions";
import { Rating } from "../components/Rating";
import { getRating } from "../actions/ratingActions";
import { SpinnerXs } from "../components/Spinner";
import { getEpisode } from "../actions/episodeActions";
import {
  addToFavorite,
  getFavorite,
  removeFavorite,
} from "../actions/favoriteActions";
import Head from "../components/Head";

const Episode = ({ history, match }) => {
  const epId = match.params.id;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCogModal, setShowCogModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);

  const {
    loading: addVideoLoading,
    error: addVideoError,
    success: addVideoSuccess,
  } = useSelector((state) => state.addNewVideo);

  const {
    loading: editVideoLoading,
    error: editVideoError,
    success: editVideoSuccess,
  } = useSelector((state) => state.editVideo);

  const { rating, loading: getRatingLoading } = useSelector(
    (state) => state.getRating
  );

  const { success: addFavSuccess, loading: addFavLoading } = useSelector(
    (state) => state.addToFavorite
  );
  const { fav, loading: getFavLoading } = useSelector(
    (state) => state.getFavorite
  );
  const { success: removeFavSuccess, loading: removeFavLoading } = useSelector(
    (state) => state.removeFavorite
  );

  const {
    loading: deleteVideoLoading,
    error: deleteVideoError,
    success: deleteVideoSuccess,
  } = useSelector((state) => state.deleteVideo);

  const { video } = useSelector((state) => state.getVideo);
  const { episode } = useSelector((state) => state.getEpisode);

  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addVideoSuccess) {
      setShowAddModal(false);
    }

    if (editVideoSuccess) {
      setShowEditModal(false);
    }

    if (deleteVideoSuccess) {
      setShowDeleteModal(false);
    }

    dispatch(getVideo(epId));
    dispatch(getEpisode(epId));
  }, [addVideoSuccess, editVideoSuccess, deleteVideoSuccess, dispatch, epId]);

  useEffect(() => {
    dispatch(getRating(epId));
  }, [dispatch, epId]);

  useEffect(() => {
    dispatch(getFavorite(epId));
  }, [dispatch, addFavSuccess, removeFavSuccess, epId]);

  useEffect(() => {
    if (
      showAddModal ||
      showEditModal ||
      showDeleteModal ||
      showRatingModal ||
      showFavModal
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [
    showAddModal,
    showEditModal,
    showDeleteModal,
    showRatingModal,
    showFavModal,
  ]);

  let air_date;

  if (episode) air_date = format(new Date(episode.airDate), "dd/MM/yyyy");

  return (
    <>
      <div className="top">
        <Head
          title={`Episode ${episode && episode.positionNum} | ${
            episode && episode.title
          }`}
        />
        <div className="go_back" onClick={() => history.goBack()}>
          <FaArrowLeft className="left_arrow" />
        </div>
        <div className="info">
          <h3>{episode && episode.title}</h3>
          <div className="avg_rating">
            <MdStar className="avg_star" />
            <span>
              {episode && episode.avgRating > 0
                ? episode.avgRating.toFixed(1)
                : 0}
            </span>
          </div>
          <span className="air_date">{air_date}</span>
        </div>
      </div>
      <div className="episode_container" onClick={() => setShowCogModal(false)}>
        <AddVideo
          show={showAddModal}
          hide={() => setShowAddModal(false)}
          id={epId}
          loading={addVideoLoading}
          error={addVideoError}
        />
        <EditVideo
          show={showEditModal}
          hide={() => setShowEditModal(false)}
          id={video && video.id}
          existingUrl={video && video.videoUrl}
          loading={editVideoLoading}
          error={editVideoError}
        />
        <DeleteModal
          show={showDeleteModal}
          hide={() => setShowDeleteModal(false)}
          onDelete={() => dispatch(deleteVideo(video.id))}
          loading={deleteVideoLoading}
          error={deleteVideoError}
          positionClass={"fixed"}
        />
        <Rating
          show={showRatingModal}
          hide={() => setShowRatingModal(false)}
          epId={epId}
          rate={rating}
          positionClass={"fixed"}
        />
        <FavModal show={showFavModal} hide={() => setShowFavModal(false)} />
        <div className="col_1">
          <div className="player">
            <VideoPlayer url={video && video.videoUrl} />
          </div>
          <div className="feedback">
            {!rating ? (
              <div className="rate" onClick={() => setShowRatingModal(true)}>
                <MdStar className="icon" />
                <span>Rate Now</span>
              </div>
            ) : (
              <div className="rated" onClick={() => setShowRatingModal(true)}>
                <div className="col_1">
                  {getRatingLoading ? (
                    <SpinnerXs color={"primary"} />
                  ) : (
                    <>
                      <span>{rating && rating.rateNum}</span>
                      <MdStar className="icon" />
                    </>
                  )}
                </div>
                <span className="rated_text">Rated</span>
              </div>
            )}

            {fav ? (
              <div
                className="favorite"
                onClick={() => dispatch(removeFavorite(fav.id))}
                title="Remove from Favorite"
              >
                {getFavLoading && <SpinnerXs color={"danger"} />}
                {removeFavLoading && <SpinnerXs color={"danger"} />}
                <MdFavorite className="icon_added" />
                <span className="added">Added</span>
              </div>
            ) : (
              <div
                className="favorite"
                onClick={() => {
                  !userInfo
                    ? setShowFavModal(true)
                    : dispatch(addToFavorite(epId));
                }}
              >
                {addFavLoading && <SpinnerXs color={"danger"} />}
                <MdFavorite className="icon_add" />
                <span className="add">Add to Favorite</span>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div
                className="config_video"
                onClick={(e) => {
                  setShowCogModal(!showCogModal);
                  e.stopPropagation();
                }}
                onMouseLeave={() => setShowCogModal(false)}
              >
                <FaCog className="icon" />
                <span>Settings</span>

                <Config
                  show={showCogModal}
                  hide={() => setShowCogModal(false)}
                  showAdd={() => setShowAddModal(true)}
                  showEdit={() => setShowEditModal(true)}
                  showDelete={() => setShowDeleteModal(true)}
                  video={video}
                />
              </div>
            )}
          </div>
        </div>
        <div className="comments">
          <CommentSection id={epId} />
        </div>
      </div>
    </>
  );
};

export default Episode;
