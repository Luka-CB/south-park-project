import React from "react";
import Head from "../components/Head";

const ErrorPage = ({ history }) => {
  return (
    <div className="error_container">
      <Head title={"404"} />
      <div className="content_box">
        <div className="error">
          <h1>4</h1>
          <h1>0</h1>
          <h1>4</h1>
        </div>
        <div className="gh"></div>
        <div className="info">
          <img src="/404.png" alt="Stan dissapointed" />
          <div className="text">
            <span>Ooops!</span>
            <h4>Looks Like Requested page Does Not Exist.</h4>
            <button
              onClick={() => history.push("/")}
              className="btn btn_shadow outline_dark fluid"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
