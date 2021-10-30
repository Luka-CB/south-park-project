import React, { useEffect, useState } from "react";
import { BsArrowUp, BsArrowDown, BsArrowRight, BsGear } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import parse from "html-react-parser";
import { getNews } from "../actions/newsActions";
import CreateNews from "../components/CreateNews";
import { ErrorMsg, NoticeMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";
import ConfigNews from "../components/ConfigNews";
import Head from "../components/Head";

const NewsPage = ({ history }) => {
  const [showAddmodal, setShowAddModal] = useState(false);
  const [showConfigmodal, setShowConfigModal] = useState(false);
  const [sort, setSort] = useState("desc");
  const [newsId, setNewsId] = useState(null);

  const { success: addNewsSuccess } = useSelector((state) => state.addNews);
  const {
    loading: getNewsLoading,
    error: getNewsError,
    news,
  } = useSelector((state) => state.getNews);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews(sort));
  }, [dispatch, addNewsSuccess, sort]);

  useEffect(() => {
    if (showAddmodal || showConfigmodal) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "unset");
  }, [showAddmodal, showConfigmodal]);

  return (
    <div className="news_wrapper">
      <Head title={"South Park News"} />
      <div className="news_container">
        <div className="header">
          <div className="sort">
            <label>Sort:</label>
            {sort === "desc" ? (
              <div className="arrows_desc" onClick={() => setSort("asc")}>
                <BsArrowDown className="down" />
                <BsArrowUp className="up" />
              </div>
            ) : (
              <div className="arrows_asc" onClick={() => setSort("desc")}>
                <BsArrowDown className="down" />
                <BsArrowUp className="up" />
              </div>
            )}
          </div>
          {userInfo && userInfo.isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn outline_dark"
            >
              Add News
            </button>
          )}
        </div>
        <hr />
        <div className="body">
          {getNewsLoading && <Spinner />}
          {getNewsError && <ErrorMsg msg={getNewsError} />}
          {news && news.length === 0 && <NoticeMsg msg={"No News"} />}
          {news &&
            news.map((n) => (
              <div key={n.id} className="news_box">
                <div className="news_content">
                  <div className="content_header">
                    <h2>{n.title}</h2>
                    {userInfo && userInfo.isAdmin && (
                      <BsGear
                        title="Settings"
                        className="gear"
                        onClick={() => {
                          setShowConfigModal(true);
                          setNewsId(n.id);
                        }}
                      />
                    )}
                  </div>
                  <hr />
                  <p>{parse(n.body.substring(0, 200))}....</p>
                </div>
                <div className="more">
                  <span className="date">
                    {format(new Date(n.createdAt), "dd/MM/yyyy")}
                  </span>
                  <div
                    className="more_btn"
                    onClick={() => history.push(`/news/${n.id}`)}
                  >
                    <span>Read More</span>
                    <BsArrowRight className="arr_right" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <CreateNews show={showAddmodal} hide={() => setShowAddModal(false)} />
      <ConfigNews
        show={showConfigmodal}
        hide={() => setShowConfigModal(false)}
        id={newsId}
      />
    </div>
  );
};

export default NewsPage;
