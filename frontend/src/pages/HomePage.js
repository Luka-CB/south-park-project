import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { getNews } from "../actions/newsActions";
import { SpinnerSm } from "../components/Spinner";
import { NoticeMsg } from "../components/Messages";
import Head from "../components/Head";
import UserActivities from "../components/UserActivities";
import HighestRatedEpisodes from "../components/HighestRatedEpisodes";
import EpisodesFromTheLatestSeason from "../components/EpisodesFromTheLatestSeason";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.login);

  const { news, loading: getNewsLoading } = useSelector(
    (state) => state.getNews
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className="home_container">
      <Head title={"Welcome to South Park"} />
      <div className="top_row">
        <div className="news_box">
          {getNewsLoading && <SpinnerSm color={"primary"} />}
          {news && news.length === 0 ? (
            <NoticeMsg msg={"No Fresh News This Time!"} />
          ) : (
            <>
              <h1>{news && news[0].title}</h1>
              <hr />
              <p>{news && parse(news[0].body)}</p>
            </>
          )}
        </div>
        <div className="pic">
          <img
            src="https://res.cloudinary.com/coolbonn/image/upload/v1629803396/soth-park-chars_ycpms8.png"
            alt="Characters"
          />
        </div>
      </div>
      {userInfo && <UserActivities username={userInfo && userInfo.username} />}
      <HighestRatedEpisodes />
      <EpisodesFromTheLatestSeason />
    </div>
  );
};

export default HomePage;
