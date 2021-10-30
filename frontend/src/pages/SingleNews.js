import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import parse from "html-react-parser";
import { getNews, getSingleNews } from "../actions/newsActions";
import { ErrorMsg, NoticeMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";
import Head from "../components/Head";
import NewsCarousel from "../components/NewsCarousel";

const SingleNews = ({ match }) => {
  const { id } = match.params;

  const [newsId, setNewsId] = useState(null);

  const { news, loading: getNewsLoading } = useSelector(
    (state) => state.getNews
  );
  const {
    loading: getSingleNewsLoading,
    error,
    singleNews,
  } = useSelector((state) => state.getSingleNews);

  const dispatch = useDispatch();

  let nId;
  if (newsId) {
    nId = newsId;
  } else {
    nId = id;
  }

  useEffect(() => {
    dispatch(getSingleNews(nId));
    dispatch(getNews());
  }, [dispatch, nId]);

  let date;
  if (singleNews) date = format(new Date(singleNews.createdAt), "dd/MM/yyyy");

  let sideNews;
  if (news) sideNews = news.filter((nw) => nw.id !== nId);

  return (
    <div className="single_news_container">
      <Head title={`News | ${singleNews && singleNews.title}`} />
      <div className="col_1">
        {getSingleNewsLoading && <Spinner />}
        {error && <ErrorMsg msg={error} />}
        <div className="header">
          <h1>{singleNews && singleNews.title}</h1>
          <span>{date}</span>
        </div>
        <hr />
        <p>{singleNews && parse(singleNews.body)}</p>
      </div>
      <div className="col_2">
        {getNewsLoading && <Spinner />}
        {sideNews && sideNews.length <= 1 && (
          <NoticeMsg msg={"No Other News!"} />
        )}
        {sideNews &&
          sideNews.map((n) => (
            <div
              key={n.id}
              className="side_news"
              onClick={() => setNewsId(n.id)}
            >
              <h4>{n.title}</h4>
              <hr />
              <p>{parse(n.body.substring(0, 100))}....</p>
            </div>
          ))}
      </div>
      <NewsCarousel otherNews={sideNews} setNewsId={setNewsId} />
    </div>
  );
};

export default SingleNews;
