import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getRatedEpisodes } from "../actions/userActions";
import EpisodesList from "../components/EpisodesList";
import Head from "../components/Head";
import { NoticeMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";

const RatedEpisodes = () => {
  const { ratedEpisodes, loading } = useSelector(
    (state) => state.getRatedEpisodes
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getRatedEpisodes());
  }, [dispatch]);

  return (
    <div className="episodes_list_container">
      <Head title={"Rated Episodes"} />
      <div className="back" onClick={() => history.goBack()}>
        <MdArrowBack className="icon" />
        <span>Go back</span>
      </div>
      <div className="header">
        <h1>List of Rated Episodes</h1>
      </div>
      <hr />
      <div className="body">
        {loading && <Spinner />}
        {ratedEpisodes && ratedEpisodes.length === 0 && (
          <NoticeMsg msg={"You Haven't Rated Any Episodes Yet"} />
        )}
        <EpisodesList episodes={ratedEpisodes} />
      </div>
    </div>
  );
};

export default RatedEpisodes;
