import React, { useState, useEffect } from "react";
import { useRecordRepository } from "../hooks/useRepository";
import { REC_HASH_RATE } from "../model/Record";

// Squad is a record label records
export const useRecords = (labelId) => {
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
