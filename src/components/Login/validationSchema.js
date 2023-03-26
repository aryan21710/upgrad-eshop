import * as Yup from "yup";

const validationSchema = Yup.object({
	username: Yup.string()
		.email("Invalid email address")
		.required("Email address is Required"),
	password: Yup.string()
		.min(5, "Password Must be 5 characters of more")
		.required("Password is Required"),
});

export default validationSchema;
