import React, { useRef, useState, useEffect } from "react";
import { useCreateRecord, useRecordMetadata } from "../../hooks/useRecords";
import useForm from "../../hooks/useForm";
import MetadataFetcher from "./MetadataFetcher";
import useMintFlow from "../../hooks/useMintFlow";
import { hasKeys } from "../../helpers/common.js";
import { useETHAccounts } from "../../hooks/useEthers";

const RecordDropdown = ({ records, value, onChange }) => {
  // Use default dropdown menu value
  let options = [
    <option key="0" value="">
      {" "}
      -- Select --{" "}
    </option>,
  ];

  const hasRecords = records && records.length > 0;

  if (hasRecords) {
    options.push(
      records.map((r) => (
        <option value={r.id} key={r.id}>
          {r.title}
        </option>
      ))
    );
  }

  options.flat();

  return (
    <div>
      {hasRecords && (
        <select name="recordId" value={value} onChange={onChange}>
          {options}
        </select>
      )}
    </div>
  );
};

const PressRecordForm = ({ labelId, draftedRecords, onSuccess }) => {
  const accounts = useETHAccounts();
  const [{ data, isLoading, error }, mint] = useMintFlow(accounts[0]);
  const [recordSelected, setRecordSelected] = useState(false);

  let hasRecords = draftedRecords && draftedRecords.length > 0;

  const onMint = async ({ values, errors }) => {
    // Trigger failure modal if any errors
    if (hasKeys(errors)) onFailure(errors);

    console.log("MintForm.onMint: ", values, errors);

    const record = draftedRecords.find(
      (r) => r.id === parseInt(values.recordId)
    );

    const mintPayload = { data: record, content: md.fp };

    const [token, hash] = await mint(mintPayload);

    onSuccess({ token, hash });
  };

  // Default value is empty
  let initialValues = { recordId: "" };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues,
      onSubmit: onMint,
    });

  useEffect(() => {
    if (values.recordId == "") {
      setRecordSelected(false);
    } else {
      setRecordSelected(true);
    }
  }, [values]);

  const md = useRecordMetadata(values.recordId);

  return (
    <div>
      <div className="submit-result">
        {isLoading ? "Loading..." : ""}
        {data ? data.msg : ""}
        {error ? error : ""}
        {md ? "Fingerprint is: " + md.fp.hash : ""}
      </div>

      {hasRecords ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Select Record</label>
              <RecordDropdown
                records={draftedRecords}
                value={values.recordId}
                onChange={handleChange}
              />

              <button disabled={!recordSelected} type="submit">
                Press Record
              </button>
            </div>
          </form>
          <br />
        </div>
      ) : (
        <p> No records to press </p>
      )}
    </div>
  );
};

export default PressRecordForm;
