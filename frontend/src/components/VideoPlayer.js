import React from "react";
import { MdVideocamOff } from "react-icons/md";
import { RiWifiOffLine } from "react-icons/ri";
import ReactPlayer from "react-player/youtube";
import { Offline, Online } from "react-detect-offline";
import { useSelector } from "react-redux";

const VideoPlayer = ({ url }) => {
  const { userInfo } = useSelector((state) => state.login);

  return (
    <div className="player_wrapper">
      {!url ? (
        <div className="no_video">
          <MdVideocamOff className="icon" />
          <div className="text">
            <h2>No Video!</h2>
            {userInfo && userInfo.isAdmin && <span>Please Add Video</span>}
          </div>
        </div>
      ) : (
        <>
          <Online>
            <ReactPlayer
              className="react_player"
              url={url}
              controls={true}
              width="100%"
              height="100%"
            />
          </Online>
          <Offline>
            <div className="offline">
              <RiWifiOffLine className="icon" />
              <div className="text">
                <h2>No Internet Connection!</h2>
                <span>Please Check Your Internet Connection</span>
              </div>
            </div>
          </Offline>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
