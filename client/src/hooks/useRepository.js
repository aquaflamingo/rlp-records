import React, { useState, useEffect } from "react";
import RecordRepository from "../repos/RecordRepository";
import RecordLabelRepository from "../repos/RecordLabelRepository";

// Returns the record repository structure
export const useRecordRepository = () => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const recordRepo = new RecordRepository();

    setRepo(recordRepo);
  }, []); // Empty array prevents infinite rerender

  return repo;
};

// Returns the record label repository structure
export const useRecordLabelRepository = (labelId) => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const labelRepo = new RecordLabelRepository();

    setRepo(labelRepo);
  }, []);

  return repo;
};
