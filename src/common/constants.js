import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8080/api";

export const FOOTER = "Copyright @UpGrad 2021";

export const API_CONFIG = {
	mode: "cors", // no-cors, *cors, same-origin
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, *same-origin, omit
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "*",
	},
	redirect: "follow", // manual, *follow, error
	referrerPolicy: "no-referrer",
};

export const RESTRICTED_ROUTES = [
	"/home",
	"/addproduct",
	"createorder",
	"/produ",
];

export const LOGIN_SUCCESS = "User Signed In successfully";
export const LOGIN_ERROR = "Sign In Failed";
export const SIGNUP_SUCCESS = "Sign up Successfull";
export const SIGNUP_ERROR = "Sign up Failed";
export const UNATHORIZED = "Restricted Page. Please Sign In.";
export const ADD_PRODUCT_SUCCESS = "Product has been added successfully";
export const UPDATE_PRODUCT_SUCCESS = "Product has been modified successfully";
export const DELETE_PRODUCT_SUCCESS = "Product deleted successfully";
export const ADD_PRODUCT_ERROR = "Failed to add Product.";
export const ADD_ADDRESS_ERROR = "Failed to add Address.";
export const ADD_ADDRESS_SUCCESS = "Address added successfully.";
export const UPDATE_PRODUCT_ERROR = "Failed to update Product.";
export const DELETE_PRODUCT_ERROR = "Failed to delete Product.";
export const GET_ALL_PRODUCT_ERROR = "Failed to fetch Products.";
export const GET_CATEGORIES_ERROR = "Failed to fetch Categories.";
export const ORDER_PLACE_SUCCESS = "Order placed successfully.";

export const INR = "\u20B9";

export const TOASTIFY_CONFIG = {
	position: toast.POSITION.TOP_LEFT,
	theme: "dark",
	autoClose: 2000,
};

export const CATEGORIES = [
	"Furniture",
	"Electronics",
	"Personal Care",
	"Apparel",
];

export const FILTERS = [
	"ALL",
	"Furniture",
	"Electronics",
	"Personal Care",
	"Apparel",
];

export const SORTING_FILTERS = [
	"Default",
	"Price: High to Low",
	"Price: Low to High",
	"Newest",
];

export const CREATE_ORDER_STEPS = ["Items", "Select Address", "Confirm Order"];

export const NAVIGATION_LINKS = {
	LOGIN: "/",
	HOME: "/home",
	PRODUCTDETAILS: "/productdetails",
	CREATEORDER: "/createorder",
	SIGNUP: "/signup",
	ADD_PRODUCTS: "/addproduct",
};
