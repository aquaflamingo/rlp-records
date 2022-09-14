import React, { useState, useEffect } from "react";

import { useETHAccounts } from "../hooks/useEthers";

const Navigation = ({ brand }) => {
  const acc = useETHAccounts();

  return (
    <nav className="">
      <a href="/">{brand}</a>
      <ul className="navbar-nav">
        <li className="nav-item">
        </li>

        <li className="nav-item">
          <a href="#">New Record</a>
        </li>

        <li className="nav-item">
          <p>{acc}</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
