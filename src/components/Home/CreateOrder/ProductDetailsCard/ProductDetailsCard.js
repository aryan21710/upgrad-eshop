import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import uuid from "react-uuid";
import Typography from "@mui/material/Typography";
import { INR } from "../../../../common/constants";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./ProductDetailsCard.css";

const ProductDetailsCard = () => {
	const productInformation =
    JSON.parse(sessionStorage.getItem("productInformation")) ?? {};

	const selectedQuantity = sessionStorage.getItem("selectedQuantity");

	const {
		imageUrl = "",
		name = "",
		price = 0,
		description = "",
		selectedCategory = "",
	} = productInformation;
	return (
		<Card key={uuid()} xs={12} sm={6} md={4} className="productDetailsCard">
			<CardMedia
				className="productDetailsCardImage"
				// eslint-disable-next-line no-undef
				image={imageUrl}
				title={name}
			/>

			<Container className="productDetailsInfoContainer">
				<CardContent>
					<Box className="nameAndAvailableItems">
						<Typography gutterBottom variant="h4" component="span">
							{name}
						</Typography>
					</Box>
					<Typography gutterBottom variant="body1" component="block">
            Quantity: {selectedQuantity}
					</Typography>
					<Typography variant="body1">
            Category{" "}
						<span className="categoryInProductDetails">{selectedCategory}</span>
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
	);
};

export default ProductDetailsCard;
