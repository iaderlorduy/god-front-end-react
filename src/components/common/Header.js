import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const activeStyle = { fontWeight: "bold" };

  return (
    <div className="header">
      <nav>
        <Link to="/" className="title">Game Of Drones</Link>
        <NavLink className="nav-button" to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        {" | "}
        <NavLink
          className="nav-button"
          to="/statistics"
          activeStyle={activeStyle}
          exact
        >
          Statistics
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
