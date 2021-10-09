import React, { useCallback, useState, useEffect } from "react";
import { useRecordRepository } from "../hooks/useRepository";
import { REC_HASH_RATE } from "../models/Fixture";

export const useRecords = ({ labelId, state, tick }) => {
  const [records, setRecords] = useState(null);
  const repo = useRecordRepository();

  useEffect(() => {
    repo
      ?.list({ labelId, state })
      .then((records) => {
        console.log("Fetched ", records.length, " records");
        setRecords(records);
      })
      .catch((err) => {
        console.error("Failed to fetch records", err);
        debugger;
      });
  }, [labelId, repo, tick]);

  return records;
};

export const useCreateRecord = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const repo = useRecordRepository();

  const request = (labelId, recordValues) => {
    setResult((prev) => ({ ...prev, isLoading: true }));

    repo
      .createRecord({ labelId, recordValues, audioFile: recordValues.audio })
      .then((res) => {
        console.log("Record was created", res);
        setResult({
          data: { msg: "Record was created 🔨" },
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Failed to create record:", error);
        debugger;
        setResult({ data: {}, isLoading: false, error });
      });
  };

  return [result, request];
};
