import yup from "yup";

const validationLoginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 1 characters length")
    .required("Password is required"),
});

export default validationLoginSchema;