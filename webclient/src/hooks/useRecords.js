import React, { useCallback, useState, useEffect } from "react";
import { useRecordRepository } from "../hooks/useRepository";
import { REC_HASH_RATE } from "../models/Fixture";

export const useRecords = ({labelId, states}) => {
  const [records, setRecords] = useState(null);
  const repo = useRecordRepository();

  useEffect(() => {
    repo
      ?.listRecords(labelId)
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

  // You POST method here
  const request = (labelId, record) => {
    setResult((prev) => ({ ...prev, isLoading: true }));

    repo
      .createRecord({ labelId, record })
      .then((res) => {
        setResult({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setResult({ data: null, isLoading: false, error });
      });
  };

  return [result, request];
};
