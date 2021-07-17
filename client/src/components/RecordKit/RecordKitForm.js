import React, { useRef, useState, useEffect } from "react";
import { useCreateRecord } from "../../hooks/useRecords";

const useRecordKitForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

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

  const handleBlur = (event) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };

  // Set any errors if applicable
  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  };

  // Combines the file values from upload field to the values
  const handleFileChange = (event) => {
    const { target } = event;
    const { name, files } = target;
    event.persist();
    setValues({ ...values, [name]: files[0] });
  };

  // Set any errors if applicable and submit with onSubmit
  const handleSubmit = (event) => {
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

const RecordKitForm = ({ labelId }) => {
  const [record, setRecord] = useState(null);
  const [{ data, isLoading, error }, createRecord] = useCreateRecord();

  const onUpload = ({ values, errors }) => {
    console.log("RecordKitForm.onUpload: ", values, errors);
    createRecord(labelId, values);
  };

  const initialValues = {
    title: "",
    artist: "",
    audio: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleFileChange,
    handleBlur,
    handleSubmit,
  } = useRecordKitForm({
    initialValues,
    onSubmit: onUpload,
  });

  return (
    <div>
      <div className="submit-result">
        {isLoading ? "Loading..." : ""}
        {data ? data.msg : ""}
        {error ? error : ""}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={handleChange}
            value={values.title}
          />

          <label>Artist</label>
          <input
            type="text"
            name="artist"
            required
            onChange={handleChange}
            value={values.artist}
          />
        </div>

        <div>
          <label>Upload</label>
          <input
            type="file"
            name="audio"
            required
            accept="audio/mp3,audio/x-wav,audio/x-m4a,audio/*;"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default RecordKitForm;
