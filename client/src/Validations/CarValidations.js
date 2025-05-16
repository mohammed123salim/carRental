import * as yup from "yup";

export const CarSchemaValidation = yup.object().shape({
  carName: yup
    .string()
    .required("Car name is required")
    .min(2, "Car name must be at least 2 characters"),
    
  carBrand: yup
    .string()
    .required("Car brand is required")
    .min(2, "Car brand must be at least 2 characters"),
    
  modelYear: yup
    .number()
    .typeError("Model year must be a number")
    .required("Model year is required")
    .min(2015, "Model year must be 2015 or later")
    .max(new Date().getFullYear() + 1, "Model year can't be in the far future"),

    plateNum: yup
    .string()
    .required("Plate Number is required")
    .matches(
      /^[A-Za-z]{1,2}[0-9]{1,5}$/,
      "Plate Number must start with 1–2 letters followed by 1–5 digits"
    ),
  

  transmission: yup
    .string()
    .required("Transmission type is required"),

  fuelType: yup
    .string()
    .required("Fuel type is required"),

  pricePerDay: yup
    .number()
    .typeError("Price must be a number")
    .required("Price per day is required")
    .min(1, "Price must be at least 1 OMR"),
});
