import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdEdit, MdArrowBack } from "react-icons/md";

const DetailHeader = ({ num, season, loading }) => {
  const { userInfo } = useSelector((state) => state.login);

  const history = useHistory();

  return (
    <>
      <div className="back" onClick={() => history.goBack()}>
        <MdArrowBack className="icon" />
        <span>Go back</span>
      </div>
      <div className="details">
        <div className="col_1">
          {loading ? (
            <img src={"/dummy-folder.png"} alt="Dummy Folder" />
          ) : (
            <img
              src={season && season.poster}
              alt={`Season ${season && season.season} Poster`}
            />
          )}
        </div>
        <div className="col_2">
          <h5>
            Year: <span>{season && season.year}</span>
          </h5>
          <h5>
            Season: <span>{season && season.season}</span>
          </h5>
          <h5>
            Episodes: <span>{season && season._count.episodes}</span>
          </h5>
        </div>
      </div>
      {userInfo && userInfo.isAdmin && (
        <div
          className="edit_season"
          onClick={() => history.push(`/seasons/${num}/update`)}
        >
          <MdEdit className="icon" />
          <span>Edit Season</span>
        </div>
      )}
    </>
  );
};

export default DetailHeader;
