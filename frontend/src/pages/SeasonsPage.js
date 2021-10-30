import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import { getSeasons } from "../actions/seasonActions";
import { ErrorMsg, NoticeMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";
import Head from "../components/Head";

const SeasonsPage = () => {
  const { loading, error, seasons } = useSelector((state) => state.getSeasons);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasons());
  }, [dispatch]);

  return (
    <div className="seasons_container">
      <Head title={"All Seasons"} />
      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}
      <div className="header">
        <h1>Seasons</h1>
        {userInfo && userInfo.isAdmin && (
          <Link to="/seasons/create" className="create_link">
            <div className="btn bg_primary btn_shadow">
              <MdCreateNewFolder className="create" />
              <span>Create</span>
            </div>
          </Link>
        )}
      </div>
      <hr />
      <div className="body">
        {!loading && seasons && seasons.length === 0 && (
          <NoticeMsg msg={"No Seasons!"} />
        )}
        {seasons &&
          seasons.map((season) => (
            <Link
              to={`/seasons/${season.season}`}
              key={season.id}
              className="season"
            >
              <div className="content">
                <img
                  src={season.poster}
                  alt={`Season ${season.season} Poster`}
                />
                <span>Season {season.season}</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SeasonsPage;
