import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitLogin } from "../../common/api";
import {
	RESTRICTED_ROUTES,
	UNATHORIZED,
	NAVIGATION_LINKS,
	TOASTIFY_CONFIG,
	FOOTER,
} from "../../common/constants";
import validationSchema from "./validationSchema";
import "./Login.css";

const initialValues = {
	username: "",
	password: "",
};

//eslint-disable-next-line
const Login = React.memo(({ setIsUserLoggedIn }) => {
	const { SIGNUP, HOME } = NAVIGATION_LINKS;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const redirectedFrom = location.state?.from?.from ?? "/";

	if (RESTRICTED_ROUTES.includes(redirectedFrom)) {
		toast.dismiss();
		toast.error(UNATHORIZED, TOASTIFY_CONFIG);
	}

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	useEffect(() => {
		if (response?.error) {
			setIsUserLoggedIn(false);
			toast.dismiss();
			toast.error(response?.error, TOASTIFY_CONFIG);
		}

		if (response?.message) {
			toast.dismiss();
			setIsUserLoggedIn(true);
			navigate(HOME);
		}
	}, [response]);
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				dispatch(submitLogin(values, setResponse));
			}}
		>
			{({ values, setFieldValue }) => {
				const handleChange = (event) => {
					const { name, value } = event.target;
					setFieldValue(name, value);
				};
				return (
					<>
						<Form>
							<Container maxWidth="sm" className="signInContainer">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="login"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign in
									</Typography>

									<TextField
										className="input"
										required
										type="email"
										label="Email Address"
										name="username"
										onChange={handleChange}
										value={values.username}
									/>
									<ErrorMessage
										name="email"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="password"
										label="Password"
										name="password"
										onChange={handleChange}
										value={values.password}
									/>
									<ErrorMessage
										name="password"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<Button className="button" variant="contained" type="submit">
                    SIGN IN
									</Button>
									<Typography variant="body1" className="signupLink">
                    Dont have an account? <Link to={SIGNUP}>Signup</Link>
									</Typography>
									<Typography variant="body1" className="loginFooter">
										{FOOTER}
									</Typography>
								</Box>
							</Container>
						</Form>
						<ToastContainer limit={1} />
					</>
				);
			}}
		</Formik>
	);
});

Login.propTypes = {
	setIsUserLoggedIn: PropTypes.func,
};

export default Login;
