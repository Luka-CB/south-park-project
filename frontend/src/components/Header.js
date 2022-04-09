import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { logout } from "../actions/userActions";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const { innerWidth } = window;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(innerWidth);
    });
  }, [innerWidth]);

  const transitions = useTransition(showDropdown, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: showDropdown,
    delay: 100,
  });

  return (
    <header>
      <Link to="/" className="logo">
        <img src={"/south-park-logo.png"} alt="South Park Logo" />
      </Link>
      <nav>
        {windowWidth <= 400 && window.innerWidth <= 400 ? (
          <>
            <AiOutlineMenu
              className="menu"
              onClick={() => setOpenMenu(!openMenu)}
            />

            {openMenu && (
              <div className="menu_items">
                <NavLink
                  to="/seasons"
                  className="menu_link"
                  activeStyle={{
                    color: "#945b47",
                    textShadow: "1px 1px 2px #945c477c",
                  }}
                >
                  <span>Seasons</span>
                </NavLink>
                <NavLink
                  to="/news"
                  className="menu_link"
                  activeStyle={{
                    color: "#945b47",
                    textShadow: "1px 1px 2px #945c477c",
                  }}
                >
                  <span>News</span>
                </NavLink>
                <NavLink
                  to="/about"
                  className="menu_link"
                  activeStyle={{
                    color: "#945b47",
                    textShadow: "1px 1px 2px #945c477c",
                  }}
                >
                  <span>About</span>
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <div className="nav_links">
            <NavLink
              to="/seasons"
              className="link"
              activeStyle={{
                color: "#945b47",
                textShadow: "1px 1px 2px #945c477c",
              }}
            >
              <span>Seasons</span>
            </NavLink>
            <NavLink
              to="/news"
              className="link"
              activeStyle={{
                color: "#945b47",
                textShadow: "1px 1px 2px #945c477c",
              }}
            >
              <span>News</span>
            </NavLink>
            <NavLink
              to="/about"
              className="link"
              activeStyle={{
                color: "#945b47",
                textShadow: "1px 1px 2px #945c477c",
              }}
            >
              <span>About</span>
            </NavLink>
          </div>
        )}
        <div className="auth_link">
          {userInfo ? (
            <>
              <div
                className="name_box"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userInfo.isAdmin ? (
                  <FaUserTie className="admin_icon" />
                ) : (
                  <p>{userInfo?.username?.charAt(0).toUpperCase()}</p>
                )}
              </div>
              {transitions(
                (styles, showDropdown) =>
                  showDropdown && (
                    <animated.div
                      style={styles}
                      className="dropdown"
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <div className="link_container">
                        <Link
                          className="links"
                          to={`/profile/${userInfo.username}`}
                        >
                          Profile
                        </Link>
                      </div>
                      <hr />
                      <span className="logout" onClick={logoutHandler}>
                        Logout
                      </span>
                    </animated.div>
                  )
              )}
            </>
          ) : (
            <Link to="/login" className="link">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
