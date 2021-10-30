import React from "react";

export const Spinner = () => {
  return (
    <div className="box">
      <div className="spinner">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const SpinnerSm = ({ color }) => {
  return (
    <div className="box_sm">
      <div className={`spinner_sm ${color}`}></div>
    </div>
  );
};

export const SpinnerXs = ({ color }) => {
  return (
    <div className="box_xs">
      <div className={`spinner_xs ${color}`}></div>
    </div>
  );
};
