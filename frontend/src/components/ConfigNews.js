import React, { useEffect, useState } from "react";
import { FiTrash, FiXCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  deleteNews,
  editNews,
  getNews,
  getSingleNews,
} from "../actions/newsActions";
import { ErrorMsg } from "./Messages";
import { Spinner, SpinnerSm } from "./Spinner";

export const DeleteNewsModal = ({ show, hide, id, loading, error }) => {
  const dispatch = useDispatch();

  return (
    <>
      {show && (
        <div className="delete_news_container">
          {loading && <SpinnerSm color={"danger"} />}
          {error && <ErrorMsg msg={error} />}
          <h2>Are You Sure?</h2>
          <div className="btns">
            <button className="btn outline_warning" onClick={hide}>
              Cancel
            </button>
            <button
              onClick={() => dispatch(deleteNews(id))}
              className="btn outline_danger"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ConfigNews = ({ show, hide, id }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showDelModal, setShowDelModal] = useState(false);

  const { singleNews } = useSelector((state) => state.getSingleNews);

  const {
    loading: editNewsLoading,
    error: editNewsError,
    success: editNewsSuccess,
  } = useSelector((state) => state.editNews);

  const {
    loading: deleteNewsLoading,
    error: deleteNewsError,
    success: deleteNewsSuccess,
  } = useSelector((state) => state.deleteNews);

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleNews && singleNews.id === id) {
      setTitle(singleNews.title);
      setBody(singleNews.body);
    } else {
      dispatch(getSingleNews(id));
    }
  }, [dispatch, singleNews, id]);

  useEffect(() => {
    if (editNewsSuccess) {
      hide();
    }

    if (deleteNewsSuccess) {
      setShowDelModal(false);
      hide();
    }

    dispatch(getNews());
  }, [dispatch, editNewsSuccess, deleteNewsSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(editNews({ title, body }, id));
  };

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 100,
  });

  const handleChange = (value) => setBody(value);

  return (
    <>
      {transitions(
        (styles, show) =>
          show && (
            <animated.div
              style={styles}
              className="config_news_bg"
              onClick={hide}
            >
              <div
                className="config_news_container"
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteNewsModal
                  show={showDelModal}
                  hide={() => setShowDelModal(false)}
                  id={id}
                  loading={deleteNewsLoading}
                  error={deleteNewsError}
                />
                {editNewsLoading && <Spinner />}
                {editNewsError && <ErrorMsg msg={editNewsError} />}
                <div className="header">
                  <h2>Update News</h2>
                  <div className="right">
                    <FiXCircle className="close" onClick={hide} />
                    <div
                      className="del_btn"
                      onClick={() => setShowDelModal(true)}
                    >
                      <FiTrash className="trash" />
                      <span>Delete News</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="body">
                  <form onSubmit={submitHandler}>
                    <div className="input_box">
                      <label>Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="input_box">
                      <label>News</label>
                      {/* <textarea
                        rows="10"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      ></textarea> */}
                      <ReactQuill
                        style={{
                          height: "100px",
                          marginBottom: "100px",
                        }}
                        value={body}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="btn btn_shadow outline_dark fluid"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default ConfigNews;
