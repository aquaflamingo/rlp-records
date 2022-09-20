import React, { useState, useEffect } from "react";

import { useETHAccounts } from "../hooks/useEthers";

const Navigation = ({ brand, member }) => {
  return (
    <nav>
      <a href="/">
        <img src="logo.svg" height="100px"/>
      </a>

      <ul className="navbar-nav">
        <li className="nav-item">
        </li>

        <li className="nav-item">{member.name}</li>

        <li className="nav-item">{member.walletAddress}</li>
      </ul>
    </nav>
  );
};

export default Navigation;
