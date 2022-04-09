import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";
import { getUser, update } from "../actions/userActions";
import { Spinner } from "./Spinner";
import { ErrorMsg } from "./Messages";

const UpdateAccount = ({ show, hide }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.getUser);
  const { success, loading, error } = useSelector((state) => state.update);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getUser());
      hide();
    }
  }, [success, dispatch]);

  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(update({ username, email, password }));
  };

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 200,
  });

  return (
    <>
      {transitions(
        (styles, show) =>
          show && (
            <animated.div style={styles} className="background" onClick={hide}>
              <div
                className="account_update"
                onClick={(e) => e.stopPropagation()}
              >
                {loading && <Spinner />}
                {error && <ErrorMsg msg={error} />}
                <div className="header">
                  <h1>Update Your Credentials</h1>
                  <span onClick={hide}>X</span>
                </div>
                <hr />
                <div className="body">
                  <form onSubmit={updateHandler}>
                    <div className="input_box">
                      <label>UserName</label>
                      <input
                        type="text"
                        placeholder="Enter New Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input_box">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Enter New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input_box">
                      <label>Password</label>
                      <input
                        type="text"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn_shadow bg_warning fluid"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default UpdateAccount;
