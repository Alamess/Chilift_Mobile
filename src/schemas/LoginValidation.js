import React from "react";
import * as yup from "yup";

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().when("email", {
    is: (val) => val && val.length > 0,
    then: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
});

export default LoginValidationSchema;
