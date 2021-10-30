import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdClose, MdDelete, MdEdit, MdVideoCall } from "react-icons/md";
import { useTransition, animated } from "react-spring";
import { addVideo, editVideo } from "../actions/videoActions";
import { Spinner, SpinnerSm } from "./Spinner";
import { ErrorMsg } from "./Messages";
import { editComment } from "../actions/commentActions";

export const DeleteModal = ({
  text,
  show,
  hide,
  onDelete,
  loading,
  error,
  positionClass,
}) => {
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
            <animated.div
              style={styles}
              className={`${positionClass} delete_modal`}
            >
              {loading && <Spinner />}
              {error && <ErrorMsg msg={error} />}
              <h2>{text}</h2>
              <div className="btns">
                <button onClick={hide} className="btn btn_shadow bg_warning">
                  Cancel
                </button>
                <button onClick={onDelete} className="btn btn_shadow bg_danger">
                  Delete
                </button>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

DeleteModal.defaultProps = {
  text: "Are You Sure?",
};

export const AddVideo = ({ show, hide, id, loading, error }) => {
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

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
            <animated.div
              style={styles}
              className="add_video_bg"
              onClick={hide}
            >
              <div
                className="add_video_container"
                onClick={(e) => e.stopPropagation()}
              >
                {loading && <Spinner />}
                {error && <ErrorMsg msg={error} />}
                <MdClose className="close" onClick={hide} />
                <h1>Add URL for Video</h1>
                <div className="form">
                  <input
                    type="text"
                    placeholder="Add URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    onClick={() => dispatch(addVideo(url, id))}
                    className="btn btn_shadow bg_dark fluid"
                    disabled={!url}
                  >
                    Add Video
                  </button>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export const Config = ({
  show,
  hide,
  showAdd,
  showEdit,
  showDelete,
  video,
}) => {
  return (
    <>
      {show && (
        <div className="config_container" onMouseLeave={hide}>
          <MdVideoCall
            onClick={!video && showAdd}
            className={!video ? "create_icon" : "create_icon_disabled"}
            title="Add Video URL"
          />
          <MdEdit
            onClick={video && showEdit}
            className={video ? "edit_icon" : "edit_icon_disabled"}
            title="Edit Video URL"
          />
          <MdDelete
            onClick={video && showDelete}
            className={video ? "del_icon" : "del_icon_disabled"}
            title="Delete Video URL"
          />
        </div>
      )}
    </>
  );
};

export const EditVideo = ({ show, hide, id, existingUrl, loading, error }) => {
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingUrl) {
      setUrl(existingUrl);
    }
  }, [existingUrl]);

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
            <animated.div
              style={styles}
              className="add_video_bg"
              onClick={hide}
            >
              <div
                className="add_video_container"
                onClick={(e) => e.stopPropagation()}
              >
                {loading && <Spinner />}
                {error && <ErrorMsg msg={error} />}
                <MdClose className="close" onClick={hide} />
                <h1>Update Video URL</h1>
                <div className="form">
                  <input
                    type="text"
                    placeholder="Add URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    onClick={() => dispatch(editVideo(url, id))}
                    className="btn btn_shadow bg_dark fluid"
                    disabled={!url}
                  >
                    Update Video
                  </button>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export const EditComment = ({ show, hide, data, loading, error }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const dispatch = useDispatch();

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
            <animated.div style={styles} className="edit_comment">
              {loading && <SpinnerSm color={"warning"} />}
              {error && <ErrorMsg msg={error} />}
              <h2>Update Comment</h2>
              <MdClose onClick={hide} className="close" />
              <div className="form">
                <textarea
                  rows="4"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <input
                  className="btn outline_dark"
                  type="submit"
                  value="Update"
                  disabled={!text}
                  onClick={() => dispatch(editComment(text, data.id))}
                />
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export const FavModal = ({ show, hide }) => {
  const history = useHistory();

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
            <animated.div style={styles} className="fav_bg" onClick={hide}>
              <div
                className="fav_container"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Please{" "}
                  <span onClick={() => history.push("/login")}>Sign In</span> To
                  Be Able To Use This Feature!
                </h3>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};
