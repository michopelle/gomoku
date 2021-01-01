import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const HeaderAuth = () => (
  <div className="right menu">
    <Link to="/gameplay" className="item">
      Game Play
    </Link>
  </div>
);

const HeaderNonAuth = () => (
  <div className="right menu">
    <Link to="/signup" className="item">
      Sign Up
    </Link>
    <Link to="/signin" className="item">
      Sign In
    </Link>
    <Link to="/gameplay" className="item">
      Game Play
    </Link>
  </div>
);

const Header = ({ authUser }) => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Landing
      </Link>
      <Link to="/gameplay" className="item">
        Game Play
      </Link>
      {/* <div>{authUser ? <HeaderAuth /> : <HeaderNonAuth />}</div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
  };
};
export default connect(mapStateToProps)(Header);
