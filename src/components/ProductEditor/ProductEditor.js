import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { Formik, Form, ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { TOASTIFY_CONFIG } from "../../common/constants";
import { addProduct } from "../../common/api";
import "./ProductEditor.css";
import validationSchema from "./validationSchema";

const ProductEditor = ({
	productId,
	heading = "ADD PRODUCT",
	submitButton = "ADD PRODUCT",
	productInformation = {
		name: "",
		manufacturer: "",
		availableItems: 0,
		price: 0,
		imageUrl: "",
		description: "",
		selectedCategory: "",
	},
}) => {
	const dispatch = useDispatch();
	//eslint-disable-next-line
  const categoriesList = useSelector(
		(state) => state.productReducer.categories
	);
	const categoriesListForSelect = categoriesList.map((category, index) => ({
		value: index,
		label: category,
	}));

	const { selectedCategory } = productInformation;

	const defaultOption = selectedCategory.length > 0 ? {value: selectedCategory,label: selectedCategory.toUpperCase()}: {};

	//eslint-disable-next-line
  const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	const [options, setOptions] = useState(categoriesListForSelect);
	const [value, setValue] = useState(defaultOption);

	const createOption = (label) => ({
		label,
		value: label.toLowerCase().replace(/\W/g, ""),
	});

	const onSelectChange = (newValue) => {
		setValue(newValue);
	};
	const handleCreate = (inputValue) => {
		const newOption = createOption(inputValue);
		setOptions((prev) => [...prev, newOption]);
		setValue(newOption);
	};

	const colourStyles = {
		control: (styles) => ({ ...styles, height: "6vh", zIndex: "1000" }),
		option: (styles) => ({ ...styles, zIndex: "1000" }),
	};

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
			initialValues={{ ...productInformation }}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				let productInformation = {
					...values,
					category: value.label.toUpperCase(),
				};
				dispatch(addProduct(productId, productInformation, setResponse));
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
							<Container maxWidth="sm" className="addProductForm">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="signUp"
								>
									<Typography variant="body1" className="text">
										{heading}
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
									<Box className="categories">
										<CreatableSelect
											styles={colourStyles}
											onChange={onSelectChange}
											isClearable={true}
											onCreateOption={handleCreate}
											options={options}
											defaultValue={value}
											value={value}
										/>
									</Box>
									<TextField
										className="input"
										required
										label="Manufacturer"
										name="manufacturer"
										onChange={handleChange}
										value={values.manufacturer}
									/>
									<ErrorMessage
										name="manufacturer"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Available Items"
										name="availableItems"
										onChange={handleChange}
										value={values.availableItems}
									/>
									<ErrorMessage
										name="availableItems"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Price"
										name="price"
										onChange={handleChange}
										value={values.price}
									/>
									<ErrorMessage
										name="price"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Image Url"
										name="imageUrl"
										onChange={handleChange}
										value={values.imageUrl}
									/>
									<ErrorMessage
										name="imageUrl"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<TextField
										className="input"
										required
										label="Product Description"
										name="description"
										onChange={handleChange}
										value={values.description}
									/>
									<ErrorMessage
										name="description"
										render={(msg) => <div className="error">{msg}</div>}
									/>

									<Button className="button" variant="contained" type="submit">
										{submitButton}
									</Button>
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

export default ProductEditor;

ProductEditor.propTypes = {
	heading: PropTypes.string,
	submitButton: PropTypes.string,
	productId: PropTypes.func,
	productInformation: PropTypes.object,
};
