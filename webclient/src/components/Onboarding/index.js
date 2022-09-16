import React, { useRef, useState, useEffect } from "react";
import { useCreateMember } from "../../hooks/useMembers";
import { useRecordLabels } from "../../hooks/useRecordLabels";
import useForm from "../../hooks/useForm";
import { useETHAccounts } from "../../hooks/useEthers.js";
import { hasKeys } from "../../helpers/common.js";

const OnboardingKit = ({ walletAddress, onSuccess }) => {
  return (
    <div>
      <h1>Onboarding</h1>
      {!!walletAddress && (
        <OnboardingForm walletAddress={walletAddress} onSuccess={onSuccess} />
      )}
    </div>
  );
};

const OnboardingForm = ({ walletAddress, onSuccess }) => {
  const [{ data, isLoading, error }, createMember] = useCreateMember();

  const recordLabels = useRecordLabels();

  const onSubmitFormHandler = ({ values, errors }) => {
    if (hasKeys(errors)) onFailure(errors);

    console.log("OnboardingForm.onSubmitFormHandler: ", values, errors);

    // Set the wallet address value here to prevent incorrect entry on sign up
    const result = createMember(values);

    result
      .then((res) => {
        onSuccess(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const initialValues = {
    name: "test",
    labelId: 1,
    walletAddress: walletAddress,
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({
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
          <p>This is the name of your member account</p>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={values.name}
          />

          <label>Wallet Address</label>
          <p>
            Your wallet address comes from the current account in your wallet
          </p>
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
          <p>Pick a record label to join</p>
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
      Select a record label{" "}
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
