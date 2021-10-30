import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTransition, animated } from "react-spring";
import { addNews } from "../actions/newsActions";
import { Spinner } from "./Spinner";
import { ErrorMsg } from "./Messages";

const CreateNews = ({ show, hide }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { loading, error, success } = useSelector((state) => state.addNews);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      hide();
      setTitle("");
      setBody("");
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addNews({ title, body }));
  };

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 100,
  });

  const handleChange = (value) => {
    setBody(value);
  };

  return (
    <>
      {transitions(
        (styles, show) =>
          show && (
            <animated.div style={styles} className="cr_news_bg" onClick={hide}>
              <div
                className="cr_news_container"
                onClick={(e) => e.stopPropagation()}
              >
                {loading && <Spinner />}
                {error && <ErrorMsg msg={error} />}
                <AiFillCloseCircle className="close" onClick={hide} />
                <form onSubmit={submitHandler}>
                  <div className="input_box">
                    <label>Title ( Optional )</label>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="input_box">
                    <label>
                      News <span title="Required">*</span>
                    </label>

                    <ReactQuill
                      style={{ height: "100px", marginBottom: "160px" }}
                      value={body}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="btn btn_shadow outline_dark fluid"
                    disabled={!body}
                  >
                    Add News
                  </button>
                </form>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default CreateNews;
