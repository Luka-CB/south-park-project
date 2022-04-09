import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../actions/userActions";
import { DeleteModal } from "../components/Modals";
import UpdateAccount from "../components/UpdateAccount";
import Head from "../components/Head";

const Profile = ({ history }) => {
  const [showUpd, setShowUpd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { userInfo } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.getUser);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteAccount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }

    if (deleteSuccess) {
      window.location.reload();
    }
  }, [history, userInfo, deleteSuccess]);

  return (
    <div className="profile">
      <Head title={`${userInfo && userInfo.username}'s Profile`} />
      <div className="info">
        <div className="avatar">
          <img
            src={
              "https://am3pap006files.storage.live.com/y4m4g36Rzh5tb-vgPzB7aeHHfPZS2VpPXZI6NMrPxyYqleomdXUzrtiCNAtXWHvtSk677yCkaaGchyC01z2IkvNbEt3o8Pg8YbeCoaO0WM6Q-DZYSVHkINpMi058LUUywqNE77CjXr9zQFrgyn8Txh0FnPAeIw3XcS2Dhv116tBcit3uR6ktqhbjeIeOs5tyRrR?width=250&height=340&cropmode=none"
            }
            alt="Nathan"
          />
        </div>
        <h2>{userInfo && userInfo.username}</h2>
      </div>

      <div className="right_side">
        <div className="user_activity">
          <button
            onClick={() =>
              history.push(`/profile/${userInfo.username}/rated_episodes`)
            }
            className="btn btn_shadow outline_dark fluid"
          >
            Rated Episodes - <span>( {user && user._count.ratings} )</span>
          </button>
          <button
            onClick={() =>
              history.push(`/profile/${userInfo.username}/favorite_episodes`)
            }
            className="btn btn_shadow outline_dark fluid"
          >
            Favorite Episodes - <span>( {user && user._count.favorites} )</span>
          </button>
        </div>

        <div className="config">
          <button
            onClick={() => setShowUpd(true)}
            className="btn bg_warning fluid btn_shadow"
          >
            Update Account
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="btn btn_shadow bg_danger fluid"
          >
            Delete Account
          </button>
        </div>
      </div>

      <UpdateAccount show={showUpd} hide={() => setShowUpd(false)} />
      <DeleteModal
        text={
          "Are You Sure? All Your Comments, Ratings and Favorites Will Also Be Deleted!"
        }
        show={showDelete}
        hide={() => setShowDelete(false)}
        onDelete={() => dispatch(deleteAccount())}
        loading={deleteLoading}
        error={deleteError}
        positionClass={"fixed"}
      />
    </div>
  );
};

export default Profile;
