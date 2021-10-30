import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

Head.defaultProps = {
  title: "South Park",
  description: "This is a demo project about south park the animated tv show",
};

export default Head;
