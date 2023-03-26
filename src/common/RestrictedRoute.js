import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LINKS } from "../common/constants";

//eslint-disable-next-line
const RestrictedRoute = ({ children }) => {
	//eslint-disable-next-line
  const ComponentName = children?.type?.name ?? '';
	const isUserLoggedIn = sessionStorage.getItem("token");

	const isAdmin = sessionStorage.getItem("isAdmin");

	const RedirectToLogin = (from) => {
		const navigate = useNavigate();
		useEffect(() => {
			navigate(NAVIGATION_LINKS.LOGIN, { state: { from } });
		}, []);
		return null;
	};

	if (ComponentName === "ProductEditor" && !isAdmin) {
		return <RedirectToLogin from={window.location.pathname} />;
	}

	if (!isUserLoggedIn) {
		console.log(window.location.pathname);
		return <RedirectToLogin from={window.location.pathname} />;
	}

	return children;
};

export default RestrictedRoute;
