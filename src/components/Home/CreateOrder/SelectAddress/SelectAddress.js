import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Formik, Form, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { addAddress, fetchAddress } from "../../../../common/api";
import { TOASTIFY_CONFIG } from "../../../../common/constants";
import "./SelectAddress.css";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import validationSchema from "./validationSchema";

const SelectAddress = ({
	selectedAddress,
	onAddressChange,
	setAddressThruForm,
}) => {
	const dispatch = useDispatch();
	const [fetchedAddress, setFetchedAddress] = useState([]);

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		dispatch(fetchAddress(setFetchedAddress));
	}, []);

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

	const addressInformation = {
		name: "",
		contactNumber: 0,
		street: "",
		city: "",
		state: "",
		landmark: "",
		zipcode: 0,
	};
	return (
		<Grid container className="selectAddressContainer">
			<Box className="selectAddressDropDownContainer">
				<FormControl fullWidth size="large">
					<InputLabel id="demo-simple-select-label">Select Address</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectedAddress}
						label="Select Address"
						name="selectedAddress"
						className="selectAddressDropDown"
						onChange={onAddressChange}
					>
						{fetchedAddress.map((address) => {
							return (
								<MenuItem value={address} key={uuid()}>
									{`${address.street} -> ${address.name},${address.city}`}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
			<Typography variant="body1" className="orText">
        ----OR----
			</Typography>
			<Formik
				initialValues={{ ...addressInformation }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					dispatch(addAddress(values, setResponse, setAddressThruForm));
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
								<Container maxWidth="sm" className="formToAddAddress">
									<Box
										sx={{
											flexGrow: 1,
											display: { xs: "flex", md: "flex" },
										}}
										className="signUp"
									>
										<Typography variant="body1" className="addAddressHeading">
                      Add Address
										</Typography>
										<TextField
											className="input"
											required
											onChange={handleChange}
											label="Name"
											name="name"
											value={values.name}
										/>
										<ErrorMessage
											name="name"
											render={(msg) => <div className="error">{msg}</div>}
										/>
										<TextField
											className="input"
											required
											label="Contact Number"
											name="contactNumber"
											onChange={handleChange}
											value={values.contactNumber}
										/>
										<ErrorMessage
											name="contactNumber"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<TextField
											className="input"
											required
											label="Street"
											name="street"
											onChange={handleChange}
											value={values.street}
										/>
										<ErrorMessage
											name="street"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<TextField
											className="input"
											required
											label="City"
											name="city"
											onChange={handleChange}
											value={values.city}
										/>
										<ErrorMessage
											name="city"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<TextField
											className="input"
											required
											label="State"
											name="state"
											onChange={handleChange}
											value={values.state}
										/>
										<ErrorMessage
											name="state"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<TextField
											className="input"
											required
											label="Landmark"
											name="landmark"
											onChange={handleChange}
											value={values.landmark}
										/>
										<ErrorMessage
											name="landmark"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<TextField
											className="input"
											required
											label="Zipcode"
											name="zipcode"
											onChange={handleChange}
											value={values.zipcode}
										/>
										<ErrorMessage
											name="zipcode"
											render={(msg) => <div className="error">{msg}</div>}
										/>

										<Button
											className="button"
											variant="contained"
											type="submit"
										>
                      SAVE ADDRESS
										</Button>
									</Box>
								</Container>
							</Form>
							<ToastContainer limit={1} />
						</>
					);
				}}
			</Formik>
		</Grid>
	);
};

SelectAddress.propTypes = {
	selectedAddress: PropTypes.object,
	onAddressChange: PropTypes.func,
	setAddressThruForm: PropTypes.func,
};

export default SelectAddress;
