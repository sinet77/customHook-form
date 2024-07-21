import { useState } from "react";

const useCustomForm = ({ initialValues, onSubmit, validationSchema }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[name] = value;
      return newValues;
    });
    setIsDirty(true);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => {
      const newTouched = { ...prevTouched };
      newTouched[name] = true;
      validateForm();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    inputHandlers: {
      onChange: handleChange,
      onBlur: handleBlur,
    },
    formHandlers: {
      onSubmit: handleSubmit,
    },
  };
};

export default useCustomForm;
