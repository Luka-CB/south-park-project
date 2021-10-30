import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../actions/commentActions";
import { ErrorMsg, NoticeMsg } from "./Messages";
import { SpinnerSm } from "./Spinner";
import { DeleteModal, EditComment } from "./Modals";

const CommentSection = ({ id }) => {
  const [text, setText] = useState("");
  const [moreComment, setMoreComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [dataForEdit, setDataForEdit] = useState(null);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.createComment);

  const { userInfo } = useSelector((state) => state.login);

  const {
    error: errorGet,
    loading: loadingGet,
    comments,
  } = useSelector((state) => state.getComments);

  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = useSelector((state) => state.deleteComment);

  const {
    error: errorEdit,
    loading: loadingEdit,
    success: successEdit,
  } = useSelector((state) => state.editComment);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      setText("");
    }

    if (successDelete) {
      setShowDeleteModal(false);
    }

    if (successEdit) {
      setShowEditModal(false);
    }

    dispatch(getComments(id));
  }, [successCreate, successDelete, successEdit, dispatch, id]);

  useEffect(() => {
    if (showEditModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [showEditModal, showDeleteModal]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createComment(text, id));
  };

  return (
    <>
      <section className="form_section">
        {loadingCreate && <SpinnerSm color={"warning"} />}
        {errorCreate && <ErrorMsg msg={errorCreate} />}
        <h1>Leave a Comment</h1>
        <form onSubmit={submitHandler}>
          <textarea
            rows="6"
            placeholder={
              !userInfo
                ? "You Must Be Signed In to Comment"
                : "Write Some Comment..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!userInfo}
            readOnly={!userInfo}
          ></textarea>
          <button
            className="btn btn_shadow bg_light"
            type="submit"
            disabled={!text || !userInfo}
          >
            Publish Comment
          </button>
        </form>
      </section>
      <div className="comment_count">
        <h4>
          Comments - <span>( {comments && comments.length} )</span>
        </h4>
      </div>
      <hr />
      <section className="comment_section">
        {loadingGet && <SpinnerSm color={"warning"} />}
        {errorGet && <ErrorMsg msg={errorGet} />}
        {comments && comments.length === 0 && (
          <NoticeMsg msg={"No Comments!"} />
        )}
        <EditComment
          show={showEditModal}
          hide={() => setShowEditModal(false)}
          data={dataForEdit}
          loading={loadingEdit}
          error={errorEdit}
        />
        <DeleteModal
          show={showDeleteModal}
          hide={() => setShowDeleteModal(false)}
          onDelete={() => dispatch(deleteComment(commentId))}
          loading={loadingDelete}
          error={errorDelete}
          positionClass={"fixed"}
        />
        {comments &&
          !moreComment &&
          comments.slice(0, 3).map((com) => (
            <div key={com.id} className="comment">
              <div className="avatar">
                <span>{com.author.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="info">
                <span className="name">{com.author.username}</span>
                <span className="date">
                  {format(new Date(com.createdAt), "dd/MM/yyyy")}
                </span>
                <p className="text">{com.text}</p>
              </div>
              {userInfo && userInfo.id === com.authorId && (
                <div className="config">
                  <MdEdit
                    onClick={() => {
                      setShowEditModal(true);
                      setDataForEdit({ text: com.text, id: com.id });
                    }}
                    className="edit_icon"
                  />
                  <MdDelete
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCommentId(com.id);
                    }}
                    className="del_icon"
                  />
                </div>
              )}
            </div>
          ))}

        {comments &&
          moreComment &&
          comments.map((com) => (
            <div key={com.id} className="comment">
              <div className="avatar">
                <span>{com.author.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="info">
                <span className="name">{com.author.username}</span>
                <span className="date">
                  {format(new Date(com.createdAt), "dd/MM/yyyy")}
                </span>
                <p className="text">{com.text}</p>
              </div>
              {userInfo && userInfo.id === com.authorId && (
                <div className="config">
                  <MdEdit
                    onClick={() => {
                      setShowEditModal(true);
                      setDataForEdit({ text: com.text, id: com.id });
                    }}
                    className="edit_icon"
                  />
                  <MdDelete
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCommentId(com.id);
                    }}
                    className="del_icon"
                  />
                </div>
              )}
            </div>
          ))}

        {comments && comments.length > 2 && (
          <button
            onClick={() => setMoreComment(!moreComment)}
            className="btn outline_light"
          >
            {!moreComment ? (
              <>
                Show More <FaCaretDown className="icon" />
              </>
            ) : (
              <>
                Show Less <FaCaretUp className="icon" />
              </>
            )}
          </button>
        )}
      </section>
    </>
  );
};

export default CommentSection;
