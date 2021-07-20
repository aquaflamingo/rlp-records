import React, { useCallback, useState, useEffect } from "react";
import { useRecordRepository } from "../hooks/useRepository";
import { REC_HASH_RATE } from "../model/Record";

export const useRecords = (labelId) : Array<Record> => {
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

type CreateRecordResult = {
	 data : any;
	 error : any;
	 isLoading : boolean;
};

interface IRecordDraft {
	 title : string;
	 artist : string;
	 audio : File;
}

type CreateRecordRequest = (labelId : string, values : IDraftRecord) => void;

export const useCreateRecord : Array<CreateRecordResult, CreateRecordRequest> = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const repo = useRecordRepository();

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
