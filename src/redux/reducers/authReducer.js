const initialState = {
	signedUpUsers: [],
	signedInUsers: [],
	users: [],
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case "SIGNIN": {
		const { email = "", token = undefined } = action.data ?? {};
		const newUser = { email, token };
		return {
			...state,
			signedInUsers: [...state.signedInUsers, newUser],
		};
	}

	case "LOGOUT": {
		return {
			...state,
			...initialState,
		};
	}
	case "USERS": {
		return {
			...state,
			users: action.data ?? [],
		};
	}

	default: {
		return state;
	}
	}
};

export default authReducer;
