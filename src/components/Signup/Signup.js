import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import {
	TOASTIFY_CONFIG,
	NAVIGATION_LINKS,
	FOOTER,
} from "../../common/constants";
import { postSignup } from "../../common/api";
import validationSchema from "./validationSchema";
import "./Signup.css";

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	contactNumber: "",
	isAdmin: false,
};

const Signup = () => {
	const dispatch = useDispatch();
	const { LOGIN } = NAVIGATION_LINKS;

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		if (response?.error) {
			toast.dismiss();
			toast.error(response?.error, TOASTIFY_CONFIG);
		}

		if (response?.message) {
			toast.dismiss();
			toast.success(response?.message, TOASTIFY_CONFIG);
		}
	}, [response]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				dispatch(postSignup(values, setResponse));
			}}
		>
			{({ values, setFieldValue }) => {
				const handleChange = (event) => {
					const { name, value } = event.target;
					if (name === "isAdmin") {
						setFieldValue(name, !values.isAdmin);
					} else {
						setFieldValue(name, value);
					}
				};

				return (
					<>
						<Form>
							<Container maxWidth="sm" className="signUpContainer">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="signUp"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign up
									</Typography>
									<TextField
										className="input"
										required
										label="First Name"
										onChange={handleChange}
										name="firstName"
										value={values.firstName}
									/>
									<ErrorMessage
										name="firstName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										label="Last Name"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
									/>
									<ErrorMessage
										name="lastName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="email"
										label="Email Address"
										name="email"
										onChange={handleChange}
										value={values.email}
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
									<TextField
										className="input"
										required
										type="password"
										label="Confirm Password"
										name="confirmPassword"
										onChange={handleChange}
										value={values.confirmPassword}
									/>
									<ErrorMessage
										name="confirmPassword"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="number"
										label="Contact Number"
										name="contactNumber"
										onChange={handleChange}
										value={values.contactNumber}
									/>
									<ErrorMessage
										name="contactNumber"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<FormControlLabel
										name="isAdmin"
										onChange={handleChange}
										control={<Checkbox checked={values.isAdmin} />}
										label="Are you an Admin User?"
									/>
									<Button className="button" variant="contained" type="submit">
                    SIGN UP
									</Button>
									<Typography variant="body1" className="signupLink">
                    Already have an account? <Link to={LOGIN}>Signin</Link>
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
};

export default Signup;
