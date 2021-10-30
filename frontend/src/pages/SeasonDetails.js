import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeason } from "../actions/seasonActions";
import DetailBody from "../components/DetailBody";
import DetailHeader from "../components/DetailHeader";
import Head from "../components/Head";

const SeasonDetails = ({ match }) => {
  const seasonNum = match.params.num;
  const { loading, season } = useSelector((state) => state.getSeason);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeason(seasonNum));
  }, [dispatch, seasonNum]);

  return (
    <div className="season_details_container">
      <Head title={`Season ${seasonNum}`} />
      <div className="header">
        <DetailHeader num={seasonNum} season={season} loading={loading} />
      </div>
      <div className="body">
        <DetailBody num={seasonNum} seasonId={season && season.id} />
      </div>
    </div>
  );
};

export default SeasonDetails;
