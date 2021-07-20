import React, { useRef, useState, useEffect } from "react";

type InputFormProps = {
	 initialValues: any;
	 onSubmit: (submitResult : any) => void;
}

const useInputForm = ({ initialValues, onSubmit } : IInputFormProps) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
	const [onSubmitting, setOnSubmitting] = useState<boolean>(false);
	const [onBlur, setOnBlur] = useState<boolean>(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setOnSubmitting(false);
      setOnBlur(false);
    }
    formRendered.current = false;
  }, [initialValues]);

	const handleBlur = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };

  // Set any errors if applicable
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  };

  // Combines the file values from upload field to the values
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, files } = target;
    event.persist();
		if (files && files?.length > 0) {
			 setValues({ ...values, [name]: files[0] });
		}
  };

  // Set any errors if applicable and submit with onSubmit
	const handleSubmit = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ values, errors });
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleFileChange,
    handleBlur,
    handleSubmit,
  };
};

export default useInputForm;
