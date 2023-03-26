import React from "react";
import "./ConfirmOrder.css";
import uuid from "react-uuid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { INR } from "../../../../common/constants";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const ConfirmOrder = ({ selectedAddress, onPlaceOrder, canPlaceOrder }) => {
	const productInformation =
    JSON.parse(sessionStorage.getItem("productInformation")) ?? {};

	const selectedQuantity = sessionStorage.getItem("selectedQuantity");

	const {
		street = "",
		contactNumber = 0,
		city = "",
		zipcode = 0,
		name = "",
		state,
	} = selectedAddress;

	const {
		name: productName = "",
		price = 0,
		description = "",
		selectedCategory = "",
	} = productInformation;
	return (
		<Grid container className="confirmOrderContainer">
			<Card key={uuid()} xs={12} sm={6} md={4} className="confirmOrderCard">
				<CardContent className="orderDetails">
					<Typography gutterBottom variant="h4">
						{productName}
					</Typography>
					<Typography gutterBottom variant="body1" component="block">
            Quantity:{" "}
						<span className="categoryInProductDetails">{selectedQuantity}</span>
					</Typography>
					<Typography variant="body1">
            Category:{" "}
						<span className="categoryInProductDetails">{selectedCategory}</span>
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
					<Typography className="priceInProductDetails" variant="body1">
						{`Total Price: ${INR} ${price}`}
					</Typography>
				</CardContent>
				<CardContent className="addressDetails">
					<Typography gutterBottom variant="h4">
            Address Details
					</Typography>
					<Typography gutterBottom variant="h6">
						{name}
					</Typography>
					<Typography gutterBottom variant="body1">
						{street}
					</Typography>
					<Typography gutterBottom variant="body1">
						{city}
					</Typography>
					<Typography gutterBottom variant="body1">
						<span className="categoryInProductDetails">ContactNumber: </span>
						{contactNumber}
					</Typography>
					<Typography gutterBottom variant="caption">
						{state}
					</Typography>
					<Typography gutterBottom variant="caption">
						{zipcode}
					</Typography>
				</CardContent>
			</Card>
			<Box className="confirmOrderActions">
				<Button
					variant="outlined"
					onClick={onPlaceOrder}
					className={canPlaceOrder && "activeButon"}
					disabled={!canPlaceOrder}
				>
          PLACE ORDER
				</Button>
			</Box>
		</Grid>
	);
};

ConfirmOrder.propTypes = {
	selectedAddress: PropTypes.object,
	onPlaceOrder: PropTypes.func,
	canPlaceOrder: PropTypes.bool,
};

export default ConfirmOrder;
