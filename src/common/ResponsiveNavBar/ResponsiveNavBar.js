import React, { useEffect, useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "../SearchBar/SearchBar";
import NavBarLinks from "../NavBarLinks/NavBarLinks";
import "./ResponsiveNavBar.css";
import _debounce from "lodash/debounce";
import { NavLink } from "react-router-dom";
import { NAVIGATION_LINKS } from "../../common/constants";

// eslint-disable-next-line
const ResponsiveNavBar = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
	// eslint-disable-next-line
  const dispatch = useDispatch();
	const { HOME, LOGIN } = NAVIGATION_LINKS;
	const [links, setLinks] = useState([
		{ name: "Login", url: "/login" },
		{ name: "Signup", url: "/signup" },
	]);

	const isAdmin = sessionStorage.getItem("isAdmin") ?? false;

	const [queryProduct, setQueryProduct] = useState("");

	const debounceFn = useCallback(
		_debounce((text) => {
			setQueryProduct(text);
			dispatch({ type: "SEARCH_PRODUCTS", data: text });
		}),
		[]
	);

	const onQueryHandler = (event) => {
		const text = event.target.value;
		debounceFn(text);
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			if (isAdmin) {
				setLinks([
					{ name: "HOME", url: "/home" },
					{ name: "ADDPRODUCT", url: "/addproduct" },
					{ name: "LOGOUT", url: "/" },
				]);
			} else {
				setLinks([
					{ name: "HOME", url: "/home" },
					{ name: "LOGOUT", url: "/" },
				]);
			}
		} else {
			setLinks([
				{ name: "LOGIN", url: "/" },
				{ name: "SIGNUP", url: "/signup" },
			]);
		}
	}, [isUserLoggedIn]);

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" className="appBar">
			<Toolbar disableGutters className="toolBar">
				<Box className="logo">
					<ShoppingCartIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					{isUserLoggedIn ? (
						<NavLink to={HOME} className="redirectToLogin">
              upGrad E-Shop
						</NavLink>
					) : (
						<NavLink to={LOGIN} className="redirectToLogin">
              upGrad E-Shop
						</NavLink>
					)}

					<ShoppingCartIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="body2"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 500,
							color: "inherit",
							textDecoration: "none",
						}}
					>
            upgrad E-Shop
					</Typography>
				</Box>

				{isUserLoggedIn && (
					<SearchBar
						queryProduct={queryProduct}
						onQueryHandler={onQueryHandler}
					/>
				)}
				<Box className="navbarWrapper">
					<NavBarLinks links={links} setIsUserLoggedIn={setIsUserLoggedIn} />
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						display: { xs: "flex", md: "none" },
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: "block", md: "none" },
						}}
					>
						{links.map((page) => (
							<MenuItem
								key={uuid()}
								onClick={() => window.open(`${page.url}`, "_self")}
							>
								<Typography textAlign="center">{page.name}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default ResponsiveNavBar;
