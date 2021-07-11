import React, { useState, useEffect } from "react";

import { useETHAccounts } from "../hooks/useEthers";

const Navigation = ({brand}) => {
	 const acc = useETHAccounts();

	 return (
			<nav className="">
				 <div className="container mx-auto">

						<ul className="navbar-nav">
							 <li className="nav-item">
									<a href="/">{brand}</a>
							 </li>

							 <li className="nav-item">
									<a href="#">New Record</a>
							 </li>

							 <li className="nav-item">
									<p>{acc}</p>
							 </li>
						</ul>
				 </div>
			</nav>
	 );
};

export default Navigation;
