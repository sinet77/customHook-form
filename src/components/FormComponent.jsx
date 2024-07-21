import React from "react";
import useCustomForm from "/src/hooks/CustomForm";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const FormComponent = () => {
  const initialValues = { name: "", email: "" };

  const onSubmit = (values) => {
    console.log("Form data:", values);
  };

  const { values, errors, inputHandlers, formHandlers } = useCustomForm({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formHandlers.onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={inputHandlers.onChange}
          onBlur={inputHandlers.onBlur}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={inputHandlers.onChange}
          onBlur={inputHandlers.onBlur}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
