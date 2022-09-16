import React, { useState, useEffect } from "react";

import { useETHAccounts } from "../hooks/useEthers";

const Navigation = ({ brand, member }) => {
  return (
    <nav>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/">{brand}</a>
        </li>

        <li className="nav-item">
          {member.name}
        </li>

        <li className="nav-item">
          {member.walletAddress}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
