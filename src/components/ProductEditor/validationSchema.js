import * as Yup from "yup";

const validationSchema = Yup.object({
	name: Yup.string()
		.max(30, "Must be 30 characters or less")
		.required("Required"),
	manufacturer: Yup.string()
		.max(20, "Must be 20 characters or less")
		.required("Required"),
	availableItems: Yup.number().required().positive().integer(),
	price: Yup.number().required().positive().integer(),
	imageUrl: Yup.string().url(),
	description: Yup.string().required().max(400),
});

export default validationSchema;
