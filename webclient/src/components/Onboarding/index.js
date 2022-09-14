import React, { useRef, useState, useEffect } from "react";
import { useCreateMember } from "../../hooks/useMembers";
import { useRecordLabels } from "../../hooks/useRecordLabels";
import useForm from "../../hooks/useForm";
import { useETHAccounts } from "../../hooks/useEthers.js";

const OnboardingKit = () => {
  // TODO:
  //
  // 1. Create user identity profile on click of button
  // 2. Ask to join a new label
  // 3. Ask for the name 
  // 4. PUT for label and POST for create a member 
  // 
  return(
    <div>
      <h1>Onboarding</h1>
      <OnboardingForm />
    </div>
  )
}

const OnboardingForm = () => {
  const [{ data, isLoading, error }, createMember] = useCreateMember();

  // FIXME: Bug in the form causing the default empty value to be rendered on the form
  const walletAddress = useETHAccounts()[0];
  const recordLabels = useRecordLabels()

  const onSubmitFormHandler = ({ values, errors }) => {
    console.log("OnboardingForm.onSubmitFormHandler: ", values, errors);

    // Set the wallet address value here to prevent incorrect entry on sign up
    createMember(values);
  };

  const initialValues = {
    name: "",
    labelId: "",
    walletAddress: walletAddress
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit: onSubmitFormHandler,
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
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={values.name}
          />

          <label>Wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            required
            disabled
            value={values.walletAddress}
          />
        </div>

        <div>
          <label>Select Record Label</label>
          <RecordLabelDropdown
            labels={recordLabels}
            value={values.labelId}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Join</button>
      </form>
    </div>
  );

  // TODO: Terms of Service + Privacy Policy
};


// TODO: Make a generic drop down component:
// params: data, values, onChange, fieldName
const RecordLabelDropdown = ({ labels, value, onChange }) => {
  // Use default dropdown menu value
  let options = [
    <option key="0" value="">
      {" "}
      Select a record label
      {" "}
    </option>,
  ];

  const haslabels = labels && labels.length > 0;

  if (haslabels) {
    options.push(
      labels.map((r) => (
        <option value={r.id} key={r.id}>
          {r.name}
        </option>
      ))
    );
  }

  options.flat();

  return (
    <div>
      {haslabels && (
        <select name="labelId" value={value} onChange={onChange}>
          {options}
        </select>
      )}
    </div>
  );
};

export default OnboardingKit;
