import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import uuid from "react-uuid";
import { NAVIGATION_LINKS } from "../../common/constants";

import "./NavBarLinks.css";

// eslint-disable-next-line
const NavBarLinks = ({ setIsUserLoggedIn, links }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// eslint-disable-next-line
  const updatedLinks = links.map((link) => {
		if (link.name === "LOGOUT") {
			return (
				<Button
					key={uuid()}
					className="logout"
					onClick={() => {
						sessionStorage.clear();
						setIsUserLoggedIn(false);
						dispatch({ type: "LOGOUT" });
						dispatch({ type: "DELETE_ALL_PRODUCTS_AND_CATEGORIES" });
						navigate(NAVIGATION_LINKS.LOGIN);
					}}
				>
					{link.name}
				</Button>
			);
		} else {
			return (
				<NavLink
					key={uuid()}
					className={({ isActive }) => (isActive ? "activeLink" : "navbarLink")}
					to={link.url}
				>
					{link.name}
				</NavLink>
			);
		}
	});

	return <>{updatedLinks.map((link) => link)}</>;
};

export default NavBarLinks;
