import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getFavoriteEpisodes } from "../actions/userActions";
import EpisodesList from "../components/EpisodesList";
import Head from "../components/Head";
import { NoticeMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";

const FavoriteEpisodes = () => {
  const { favEpisodes, loading } = useSelector(
    (state) => state.getFavoriteEpisodes
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getFavoriteEpisodes());
  }, [dispatch]);

  return (
    <div className="episodes_list_container">
      <Head title={"Favorite Episodes"} />
      <div className="back" onClick={() => history.goBack()}>
        <MdArrowBack className="icon" />
        <span>Go back</span>
      </div>
      <div className="header">
        <h1>List of Favorite Episodes</h1>
      </div>
      <hr />
      <div className="body">
        {loading && <Spinner />}
        {favEpisodes && favEpisodes.length === 0 && (
          <NoticeMsg msg={"You Don't Have Favorite Epiosdes"} />
        )}
        <EpisodesList episodes={favEpisodes} />
      </div>
    </div>
  );
};

export default FavoriteEpisodes;
