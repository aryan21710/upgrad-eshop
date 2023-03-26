import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveNavBar from "./common/ResponsiveNavBar/ResponsiveNavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import ProductEditor from "./components/ProductEditor/ProductEditor";
import ProductDetails from "./components/Home/ProductDetails/ProductDetails";
import CreateOrder from "./components/Home/CreateOrder/CreateOrder";
import RestrictedRoute from "./common/RestrictedRoute";
import { NAVIGATION_LINKS } from "./common/constants";

const AppRoutes = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(
		sessionStorage.getItem("token") ?? false
	);

	const { LOGIN, HOME, PRODUCTDETAILS, CREATEORDER, SIGNUP, ADD_PRODUCTS } =
    NAVIGATION_LINKS;

	return (
		<>
			<Router>
				<ResponsiveNavBar
					setIsUserLoggedIn={setIsUserLoggedIn}
					isUserLoggedIn={isUserLoggedIn}
				/>
				<Routes>
					<Route
						exact
						path={LOGIN}
						element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
					/>
					<Route exact path={SIGNUP} element={<Signup />} />
					<Route
						exact
						path={HOME}
						element={
							<RestrictedRoute>
								<Home />
							</RestrictedRoute>
						}
					/>
					<Route
						exact
						path={ADD_PRODUCTS}
						element={
							<RestrictedRoute>
								<ProductEditor />
							</RestrictedRoute>
						}
					/>
					<Route
						exact
						path={PRODUCTDETAILS}
						element={
							<RestrictedRoute>
								<ProductDetails />
							</RestrictedRoute>
						}
					/>
					<Route
						exact
						path={CREATEORDER}
						element={
							<RestrictedRoute>
								<CreateOrder />
							</RestrictedRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
