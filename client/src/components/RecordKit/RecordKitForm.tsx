import React, { useRef, useState, useEffect } from "react";
import { useCreateRecord } from "../../hooks/useRecords";
import useInputForm  from "../../hooks/useInputForm";

type RecordKitFormProps = {
	 labelId : string
}

const RecordKitForm = ({ labelId } : RecordKitFormProps) => {
  const [record, setRecord] = useState(null);
  const [{ data, isLoading, error }, createRecord] = useCreateRecord();

	const onUpload = ({ values, errors } : any) : void => {
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
  } = useInputForm({
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
