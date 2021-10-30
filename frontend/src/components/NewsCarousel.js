import React from "react";
import { Carousel } from "react-responsive-carousel";
import parse from "html-react-parser";

const NewsCarousel = ({ otherNews, setNewsId }) => {
  return (
    <div className="carousel_wrapper">
      <h2>Read Other News</h2>
      <Carousel>
        {otherNews &&
          otherNews.map((news) => (
            <div className="news">
              <p>{parse(news.body.substring(0, 500))}....</p>
              <h1 onClick={() => setNewsId(news.id)} className="legend">
                {news.title}
              </h1>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
