import React from "react";

function Header(props) {
  return (
    <header className="header">
      <h1 className="header__h1 tracking-in-contract">QUAKR</h1>
      <p className="header__p">
        An up-to-date visualisation of earthquakes across the world
      </p>
    </header>
  );
}

export default Header;
