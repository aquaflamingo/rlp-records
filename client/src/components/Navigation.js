import React, { useState, useEffect } from 'react'

import { useETHAccounts } from "../hooks/useEthers"

const Navigation = () => {
	 const acc = useETHAccounts()

	 return (
			<nav class="">
				 <div class="container mx-auto">
						<ul class="navbar-nav">
							 <li class="nav-item">
									<a href="#">New</a>
							 </li>

							 <li class="nav-item">
									<p>{acc}</p>
							 </li>
						</ul>
				 </div>
			</nav>
	 )
}

export default Navigation;
