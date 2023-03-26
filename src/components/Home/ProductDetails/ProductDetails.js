import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./ProductDetails.css";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import uuid from "react-uuid";
import Typography from "@mui/material/Typography";
import { INR, NAVIGATION_LINKS } from "../../../common/constants";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
	const navigate = useNavigate();

	const { CREATEORDER } = NAVIGATION_LINKS;

	const currentUrl = window.location.href;
	const [productDetailsCardClassName, setProductDetailsCardClassName] =
    useState("productDetailsCard");
	if (currentUrl.includes[`${CREATEORDER}`]) {
		setProductDetailsCardClassName("productDetailsCardInCreateOrder");
	}

	const [selectedQuantity, setSelectedQuantity] = useState("");
	const handleSelectedQuantity = (e) => {
		const quantity = isNaN(parseInt(e.target.value))
			? ""
			: parseInt(e.target.value);
		sessionStorage.setItem("selectedQuantity", quantity);
		setSelectedQuantity(quantity);
	};
	const productInformation =
    JSON.parse(sessionStorage.getItem("productInformation")) ?? {};

	const {
		imageUrl = "",
		name = "",
		price = 0,
		description = "",
		selectedCategory = "",
		availableItems = 0,
	} = productInformation;

	const handlePlaceOrder = () => navigate(CREATEORDER);

	return (
		<Grid container className="productDetailsContainer">
			<Card
				key={uuid()}
				xs={12}
				sm={6}
				md={4}
				className={productDetailsCardClassName}
			>
				<CardMedia
					className="productDetailsImage"
					image={imageUrl}
					title={name}
				/>

				<Container className="productDetailsInfoContainer">
					<CardContent>
						<Box className="nameAndAvailableItems">
							<Typography gutterBottom variant="h4" component="span">
								{name}
							</Typography>
							<Typography
								gutterBottom
								className="availableItemsInProductDetails"
								variant="body1"
								component="span"
							>
                Available Quantity: {availableItems}
							</Typography>
						</Box>
						<Typography variant="body1">
              Category{" "}
							<span className="categoryInProductDetails">
								{selectedCategory}
							</span>
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
						<Typography className="priceInProductDetails" variant="body1">
							{`${INR} ${price}`}
						</Typography>
					</CardContent>
				</Container>
			</Card>
			<Container className="productDetailsCardActions">
				<TextField
					size="small"
					variant="outlined"
					label="Enter Quantity"
					className="enterQuantity"
					id="outlined-basic"
					name="selectedQuantity"
					value={selectedQuantity}
					onChange={handleSelectedQuantity}
				/>
				<Button
					variant="contained"
					className="placeOrder"
					onClick={handlePlaceOrder}
					disabled={selectedQuantity === 0}
				>
          PLACE ORDER
				</Button>
			</Container>
		</Grid>
	);
};

export default ProductDetails;
