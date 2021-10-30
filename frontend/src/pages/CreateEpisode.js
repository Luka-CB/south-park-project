import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { addNewEpisode } from "../actions/episodeActions";
import { ImageContext } from "../context/imageUpload";
import { Spinner } from "../components/Spinner";
import { ErrorMsg } from "../components/Messages";
import { ADD_NEW_EPISODE_RESET } from "../constants/episodeConstants";
import Head from "../components/Head";

const CreateEpisode = ({ history, match }) => {
  const seasonId = match.params.id;

  const [positionNum, setPositionNum] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [airDate, setAirDate] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState(null);

  const { uploading, uploadUrl, uploadImage } = useContext(ImageContext);

  const { loading, error, success } = useSelector(
    (state) => state.addNewEpisode
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadUrl) {
      setThumbnail(uploadUrl);
    }

    if (success) {
      dispatch({ type: ADD_NEW_EPISODE_RESET });
      history.goBack();
    }
  }, [uploadUrl, success, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addNewEpisode(
        { positionNum, title, description, airDate, thumbnail },
        seasonId
      )
    );
  };

  return (
    <div className="input_wrapper">
      <Head title={"Add New Episode"} />
      <div className="go_back" onClick={() => history.goBack()}>
        <FaArrowLeft className="left_arrow" />
      </div>
      <div className="input_container">
        {loading && <Spinner />}
        {uploading && <Spinner />}
        {error && <ErrorMsg msg={error} />}
        <div className="header">
          <h1>Add New Episode</h1>
        </div>
        <hr />
        <form onSubmit={submitHandler}>
          <div className="input_box">
            <label>Position Number</label>
            <input
              type="number"
              placeholder="Enter Episode Position Number"
              value={positionNum}
              onChange={(e) => setPositionNum(e.target.value)}
              required
            />
          </div>

          <div className="input_box">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Episode Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
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
              required
            ></textarea>
          </div>

          <div className="input_box">
            <label>Air Date</label>
            <input
              type="date"
              placeholder="Pick Air Date"
              value={airDate}
              onChange={(e) => setAirDate(e.target.value)}
              required
            />
          </div>

          <div className="input_box">
            <label>Thumbnail</label>
            <input
              type="text"
              placeholder="Enter Tumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEpisode;
