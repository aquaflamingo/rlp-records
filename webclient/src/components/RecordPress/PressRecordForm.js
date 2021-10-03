import React, { useRef, useState, useEffect } from "react";
import { useCreateRecord } from "../../hooks/useRecords";
import useForm from "../../hooks/useForm";
import useMint from "../../hooks/useMint";
import { useETHAccounts } from "../../hooks/useEthers";

const RecordDropdown = ({ records, value, onChange }) => {
  // Use default dropdown menu value
  let options = [
    <option key="0" disabled value="">
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

const PressRecordForm = ({ labelId, draftedRecords }) => {
  const accounts = useETHAccounts();
  const [{ data, isLoading, error }, mint] = useMint(accounts[0]);

  let hasRecords = draftedRecords && draftedRecords.length > 0;

  const onMint = async ({ values, errors }) => {
    console.log("MintForm.onMint: ", values, errors);
    const record = draftedRecords.find((r) => r.id === parseInt(values.recordId));
		 console.log("MintForm.onMint, Record:", record)
    mint(record);
  };

  // Default value is empty
  let initialValues = { recordId: "" };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues,
      onSubmit: onMint,
    });

  return (
    <div>
      <div className="submit-result">
        {isLoading ? "Loading..." : ""}
        {data ? data.msg : ""}
        {error ? error : ""}
      </div>

      {hasRecords ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Select Record</label>
            <RecordDropdown
              records={draftedRecords}
              value={values.recordId}
              onChange={handleChange}
            />

            <button type="submit">Press Record</button>
          </div>
        </form>
      ) : (
        <p> No records to press </p>
      )}
    </div>
  );
};

export default PressRecordForm;
