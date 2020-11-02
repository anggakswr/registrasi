import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = ({ changeEmail, email }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {email ? (
            <>
              <li className="nav-item">
                <Link to="/rahasia" className="nav-link">
                  Text Rahasia
                </Link>
              </li>

              <li className="nav-item">
                <a href="/logout" className="nav-link" onClick={changeEmail}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
