import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Not a valid email format")
    .required("Email is required"),

  address: yup
    .string()
    .trim()
    .required("Address is required"),

  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]{8,15}$/, "Phone must be 8–15 digits")
    .required("Phone is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .integer("Age must be an integer")
    .min(23, "You must be at least 23")
    .required("Age is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special"
    ),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
});
