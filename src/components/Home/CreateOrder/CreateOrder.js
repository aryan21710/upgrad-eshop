import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import {
	ORDER_PLACE_SUCCESS,
	TOASTIFY_CONFIG,
} from "../../../common/constants";

import "./CreateOrder.css";
import HorizontalStepper from "../../../common/HorizontalStepper/HorizontalStepper";
import ProductDetailsCard from "./ProductDetailsCard/ProductDetailsCard";
import SelectAddress from "./SelectAddress/SelectAddress";
import ConfirmOrder from "./ConfirmOrder/ConfirmOrder";

const CreateOrder = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [selectedAddress, setSelectedAddress] = useState({});
	const onAddressChange = (e) => setSelectedAddress(e.target.value);
	const [addressThruForm, setAddressThruForm] = useState({});
	const [isOrderPlaced, setIsOrderPlaced] = useState(false);
	const [canPlaceOrder, setCanPlaceOrder] = useState(false);

	const onPlaceOrder = () => {
		if (canPlaceOrder) {
			setIsOrderPlaced(true);
		}
	};

	useEffect(() => {
		if (
			Object.keys(addressThruForm).length > 0 ||
      Object.keys(selectedAddress).length > 0
		) {
			setCanPlaceOrder(true);
		}
	}, [addressThruForm, selectedAddress]);

	useEffect(() => {
		if (isOrderPlaced) {
			toast.dismiss();
			toast.success(ORDER_PLACE_SUCCESS, TOASTIFY_CONFIG);
		}
	}, [isOrderPlaced]);

	const getComponentByNumber = (number) => {
		switch (number) {
		case 0:
			return <ProductDetailsCard />;
		case 1:
			return (
				<SelectAddress
					selectedAddress={selectedAddress}
					onAddressChange={onAddressChange}
					setAddressThruForm={setAddressThruForm}
				/>
			);
		case 2:
			return (
				<ConfirmOrder
					selectedAddress={selectedAddress}
					onPlaceOrder={onPlaceOrder}
					canPlaceOrder={canPlaceOrder}
				/>
			);
		default:
			return null;
		}
	};

	return (
		<Grid container className="createOrderContainer">
			<HorizontalStepper
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				addressThruForm={addressThruForm}
				selectedAddress={selectedAddress}
				isOrderPlaced={isOrderPlaced}
			/>
			{getComponentByNumber(activeStep)}
			<ToastContainer limit={1} />
		</Grid>
	);
};

export default CreateOrder;
