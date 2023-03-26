import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.string()
		.max(30, "Must be 30 characters or less")
		.required("Required"),
	street: Yup.string()
		.max(30, "Must be 30 characters or less")
		.required("Required"),
	city: Yup.string()
		.max(30, "Must be 30 characters or less")
		.required("Required"),
	state: Yup.string()
		.max(20, "Must be 20 characters or less")
		.required("Required"),
	landmark: Yup.string()
		.max(30, "Must be 30 characters or less")
		.required("Required"),
	zipcode: Yup.number()
		.required()
		.positive()
		.integer()
		.test(
			"len",
			"Zip Code must be minimum 5 digits",
			(val) => val && val.toString().length > 4
		),
	contactNumber: Yup.number()
		.typeError("Contact Number should be a Number")
		.required("Contact Number is Required")
		.positive()
		.integer()
		.test(
			"len",
			"Phone number must be minimum 8 digits",
			(val) => val && val.toString().length > 8
		),
});

export default validationSchema;
