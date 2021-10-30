import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { ImageContext } from "../context/imageUpload";
import { createSeason } from "../actions/seasonActions";
import { Spinner } from "../components/Spinner";
import { ErrorMsg } from "../components/Messages";
import { CREATE_SEASONS_RESET } from "../constants/seasonConstants";
import Head from "../components/Head";

const SeasonCreate = ({ history }) => {
  const [seasonNum, setSeasonNum] = useState("");
  const [year, setYear] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [image, setImage] = useState(null);

  const { uploading, uploadUrl, uploadImage } = useContext(ImageContext);
  const { loading, success, error } = useSelector(
    (state) => state.createSeason
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadUrl) {
      setPosterUrl(uploadUrl);
    }

    if (success) {
      dispatch({ type: CREATE_SEASONS_RESET });
      history.goBack();
    }
  }, [uploadUrl, success, history, dispatch]);

  const uploadHandler = () => {
    uploadImage(image);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createSeason({ season: seasonNum, year, poster: posterUrl }));
  };

  return (
    <div className="input_wrapper">
      <Head title={"All Seasons | Create"} />
      <div className="input_container">
        <div className="go_back" onClick={() => history.goBack()}>
          <FaArrowLeft className="left_arrow" />
        </div>
        {loading && <Spinner />}
        {uploading && <Spinner />}
        {error && <ErrorMsg msg={error} />}
        <div className="header">
          <h1>Create Season</h1>
        </div>
        <hr />
        <form onSubmit={submitHandler}>
          <div className="input_box">
            <label>Season</label>
            <input
              type="number"
              placeholder="Enter Number of Season"
              value={seasonNum}
              onChange={(e) => setSeasonNum(e.target.value)}
            />
          </div>

          <div className="input_box">
            <label>Year</label>
            <input
              type="number"
              placeholder="Enter Year of Season"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="input_box">
            <label>Poster Url</label>
            <input
              type="text"
              placeholder="Enter Season Poster Url"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />
          </div>
          <div className="or">
            <span>OR</span>
          </div>
          <div className="upload_input_box">
            <label>Upload Poster</label>
            <div className="upload_box">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button
                className="btn btn_shadow bg_dark upload_btn"
                onClick={uploadHandler}
                type="button"
                disabled={!image}
              >
                Upload
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn_shadow bg_dark">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeasonCreate;
