import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/userActions";
import { ErrorMsg } from "../components/Messages";
import { Spinner } from "../components/Spinner";

const RegisterPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const { loading, error } = useSelector((state) => state.register);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const registerHandler = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setErrMsg("Passwords Doesn't Match");
      return;
    }

    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div className="auth_container">
      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}
      {errMsg && <ErrorMsg msg={errMsg} />}
      <main>
        <section className="header">
          <h1>Sign Up</h1>
        </section>
        <hr />
        <section className="body">
          <div className="form_box">
            <form onSubmit={registerHandler}>
              <div className="input_box">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input_box">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Existing Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input_box">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input_box">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeate Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn_shadow bg_primary" type="submit">
                Sign Up
              </button>
            </form>
            <h3>
              Already Have an Account?{" "}
              <Link className="link" to="/login">
                Sign In
              </Link>
            </h3>
          </div>
          <div className="img">
            <img src={"/butters.png"} alt="Butters" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
