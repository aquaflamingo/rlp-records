import React, { useCallback, useState, useEffect } from "react";
import { useRecordRepository } from "../hooks/useRepository";
import { REC_HASH_RATE } from "../models/Fixture";

export const useRecords = ({ labelId, state }) => {
  const [records, setRecords] = useState(null);
  const repo = useRecordRepository();

  useEffect(() => {
    repo
      ?.list({ labelId, state })
      .then((records) => {
        setRecords(records);
      })
      .catch((err) => {
        console.error("Failed to fetch records", err);
        debugger;
      });
  }, [labelId, repo]);

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
        setResult({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        console.error("Failed to create record:", error);
        // FIXME: error
        setResult({ data: [], isLoading: false, error });
      });
  };

  return [result, request];
};
