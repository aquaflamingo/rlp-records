import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarItem, NavbarContainer } from "react-bulma-components";

import { useETHAccounts } from "../hooks/useEthers";

const Navigation = ({ brand }) => {
  const acc = useETHAccounts();

  return (
		 <Navbar> 
			<NavbarBrand> 
				 <NavbarItem href="#">
						{brand}
				 <NavbarItem>
			<NavbarContainer>
				 <NavbarItem href="#">
						New Record
				 <NavbarItem>
		 </NavbarContainer>
			<NavbarContainer align="end">
				 <NavbarItem> 
						{acc}
				 </NavbarItem> 
		 </NavbarContainer>
	</Navbar>
  );
};

export default Navigation;
