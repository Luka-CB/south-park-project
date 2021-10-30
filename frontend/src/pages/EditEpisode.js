import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { editEpisode, getEpisode } from "../actions/episodeActions";
import { ImageContext } from "../context/imageUpload";
import { Spinner } from "../components/Spinner";
import { ErrorMsg } from "../components/Messages";
import { EDIT_EPISODE_RESET } from "../constants/episodeConstants";
import Head from "../components/Head";

const UpdateEpisode = ({ history, match }) => {
  const epId = match.params.id;

  const [positionNum, setPositionNum] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [airDate, setAirDate] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState(null);

  const { uploading, uploadUrl, uploadImage } = useContext(ImageContext);

  const { loading, error, success } = useSelector((state) => state.editEpisode);
  const { episode } = useSelector((state) => state.getEpisode);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadUrl) {
      setThumbnail(uploadUrl);
    }

    if (episode && episode.id === epId) {
      setPositionNum(episode.positionNum);
      setTitle(episode.title);
      setDescription(episode.description);
      setThumbnail(episode.thumbnail);
    } else {
      dispatch(getEpisode(epId));
    }

    if (success) {
      dispatch({ type: EDIT_EPISODE_RESET });
      history.goBack();
    }
  }, [uploadUrl, dispatch, episode, epId, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      editEpisode({ positionNum, title, description, airDate, thumbnail }, epId)
    );
  };

  return (
    <div className="input_wrapper">
      <Head title={`Episode ${episode && episode.positionNum} | Update`} />
      <div className="go_back" onClick={() => history.goBack()}>
        <FaArrowLeft className="left_arrow" />
      </div>
      <div className="input_container">
        {loading && <Spinner />}
        {uploading && <Spinner />}
        {error && <ErrorMsg msg={error} />}
        <div className="header">
          <h1>Edit Episode</h1>
        </div>
        <hr />
        <form onSubmit={submitHandler}>
          <div className="input_box">
            <label>Position Number</label>
            <input
              type="number"
              placeholder="Enter Position Number"
              value={positionNum}
              onChange={(e) => setPositionNum(e.target.value)}
            />
          </div>

          <div className="input_box">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Episode Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input_box">
            <label>Description</label>
            <textarea
              type="text"
              placeholder="Enter Episode Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="input_box">
            <label>Air Date</label>
            <input
              type="date"
              placeholder="Pick Air Date"
              value={airDate}
              onChange={(e) => setAirDate(e.target.value)}
            />
          </div>

          <div className="input_box">
            <label>Thumbnail</label>
            <input
              type="text"
              placeholder="Enter Tumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          <div className="or">
            <span>OR</span>
          </div>

          <div className="upload_input_box">
            <label>Upload Thumbnail</label>
            <div className="upload_box">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button
                className="btn btn_shadow bg_dark upload_btn"
                onClick={() => uploadImage(image)}
                type="button"
                disabled={!image}
              >
                Upload
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn_shadow bg_dark">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEpisode;
