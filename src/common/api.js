import {
	BASE_URL,
	API_CONFIG,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_ERROR,
	GET_CATEGORIES_ERROR,
	GET_ALL_PRODUCT_ERROR,
	DELETE_PRODUCT_ERROR,
	DELETE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_ERROR,
	ADD_ADDRESS_SUCCESS,
	ADD_ADDRESS_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
} from "../common/constants";

export const postSignup = (userCredentials, setResponse) => {
	return async () => {
		const { firstName, lastName, email, password, contactNumber, isAdmin } =
      userCredentials;
		let response;
		let error;
		let body = { firstName, lastName, email, password, contactNumber };
		body = isAdmin ? { ...body, role: ["admin"] } : { ...body, role: ["user"] };
		try {
			response = await fetch(`${BASE_URL}/auth/signup`, {
				...API_CONFIG,
				method: "POST",
				body: JSON.stringify(body),
			});
			response = await response.json();
			if (response?.message.includes("Error")) {
				error = response.message;
			}
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (response && !response?.message.includes("Error")) {
				setResponse({
					loading: false,
					message: SIGNUP_SUCCESS,
					error: null,
				});
			} else {
				setResponse({
					loading: false,
					error: error ? error : SIGNUP_ERROR,
					message: null,
				});
			}
		}
	};
};

export const submitLogin = (userCredentials, setResponse) => {
	return async (dispatch) => {
		const { username: email } = userCredentials;
		let token;
		try {
			let response = await fetch(`${BASE_URL}/auth/signin`, {
				...API_CONFIG,
				method: "POST",
				body: JSON.stringify(userCredentials),
			});
			response = await response.json();
			token = response?.token;
			if (token) {
				sessionStorage.setItem("token", token);
				sessionStorage.setItem("email", email);
				response = await fetch(`${BASE_URL}/users`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				response = await response.json();
				if (response && response.length > 0) {
					const user = response.filter(
						(user) => user.email.trim() === email.trim()
					);
					user.length > 0 && sessionStorage.setItem("userId", user[0].id);
					let isAdmin = user.length > 0 && user[0].roles[0].name === "ADMIN";
					isAdmin && sessionStorage.setItem("isAdmin", isAdmin);
					dispatch({ type: "USERS", data: response });
				}
			}
		} catch (err) {
			console.error(`err ${err}`);
		} finally {
			if (token) {
				setResponse({
					loading: false,
					error: null,
					message: LOGIN_SUCCESS,
				});
				dispatch({ type: "SIGNIN", data: { email, token: token } });
			} else {
				setResponse({
					loading: false,
					message: null,
					error: LOGIN_ERROR,
				});
			}
		}
	};
};

export const addProduct = (productId, product, setResponse) => {
	const url = productId
		? `${BASE_URL}/products/${productId}`
		: `${BASE_URL}/products`;
	return async (dispatch) => {
		let response;
		try {
			let token = sessionStorage.getItem("token");
			response = await fetch(url, {
				...API_CONFIG,
				method: productId ? "PUT" : "POST",
				headers: {
					...API_CONFIG.headers,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(product),
			});
			response = await response;

			if (String(response?.status).match(/^2\d{2}$/g)) {
				productId && dispatch({ type: "PRODUCT_UPDATE" });
			} else {
				response = null;
			}
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				setResponse({
					loading: false,
					error: null,
					message: productId ? UPDATE_PRODUCT_SUCCESS : ADD_PRODUCT_SUCCESS,
				});
			} else {
				setResponse({
					loading: false,
					error: productId ? UPDATE_PRODUCT_ERROR : ADD_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};

export const fetchCategories = (setResponse, setFilters) => {
	return async (dispatch) => {
		let response;
		try {
			response = await fetch(`${BASE_URL}/products/categories`, {
				...API_CONFIG,
				method: "GET",
			});
			response = await response.json();
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (!response?.error) {
				const filters = [...response, "ALL"];
				setFilters(filters);
				dispatch({ type: "GET_CATEGORIES", data: filters });
			} else {
				setResponse({
					loading: false,
					error: GET_CATEGORIES_ERROR,
					message: null,
				});
			}
		}
	};
};

export const fetchProducts = (
	setResponse,
	setProductsList,
	setFilters,
	setOriginalProdList
) => {
	return async (dispatch) => {
		let response;
		try {
			response = await fetch(`${BASE_URL}/products/categories`, {
				...API_CONFIG,
				method: "GET",
			});
			response = await response.json();
			if (!response?.error) {
				const filters = ["ALL", ...response];
				setFilters(filters);
				dispatch({ type: "GET_CATEGORIES", data: filters });
			}
			response = await fetch(`${BASE_URL}/products`, {
				...API_CONFIG,
				method: "GET",
			});
			response = await response.json();
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				dispatch({ type: "GET_ALL_PRODUCTS", data: response });
				setProductsList([...response]);
				setOriginalProdList([...response]);
			} else {
				setResponse({
					loading: false,
					error: GET_ALL_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};

export const deleteProduct = (productId, setResponse) => {
	return async (dispatch) => {
		let response;
		let token = sessionStorage.getItem("token") ?? "";
		try {
			response = await fetch(`${BASE_URL}/products/${productId}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			response = await response;
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (String(response?.status).match(/^2\d{2}$/g)) {
				dispatch({ type: "DELETE_PRODUCTS_BY_ID", data: productId });
				setResponse({
					loading: false,
					message: DELETE_PRODUCT_SUCCESS,
					error: null,
				});
			} else {
				setResponse({
					loading: false,
					error: DELETE_PRODUCT_ERROR,
					message: null,
				});
			}
		}
	};
};

export const addAddress = (
	addressInformation,
	setResponse,
	setAddressThruForm
) => {
	return async () => {
		let response;
		try {
			const token = sessionStorage.getItem("token");
			const user = sessionStorage.getItem("userId");
			const body = user
				? JSON.stringify({ ...addressInformation, user })
				: JSON.stringify({ ...addressInformation });

			response = await fetch(`${BASE_URL}/addresses`, {
				...API_CONFIG,
				method: "POST",
				headers: {
					...API_CONFIG.headers,
					Authorization: `Bearer ${token}`,
				},
				body,
			});
			response = await response;

			if (!String(response?.status).match(/^2\d{2}$/g)) {
				response = null;
			}
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				setResponse({
					loading: false,
					error: null,
					message: ADD_ADDRESS_SUCCESS,
				});
				setAddressThruForm({ ...addressInformation });
			} else {
				setResponse({
					loading: false,
					error: ADD_ADDRESS_ERROR,
					message: null,
				});
			}
		}
	};
};

export const fetchAddress = (setFetchedAddress) => {
	return async () => {
		let response;
		try {
			const token = sessionStorage.getItem("token");
			response = await fetch(`${BASE_URL}/addresses`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			response = await response.json();
		} catch (err) {
			console.error(`err ${err}`);
			response = null;
		} finally {
			if (response) {
				setFetchedAddress([...response]);
			}
		}
	};
};
