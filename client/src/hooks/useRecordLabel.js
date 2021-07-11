import React, { useState, useEffect } from "react";
import { RLP_RECORDS } from "../model/RecordLabel";

// Squad is a record label records
export const useRecordLabel = () => {
	 // FIXME - reach out to chain to get record label membership
  const [label, setLabel] = useState(null);

  useEffect(() => {
			setLabel(RLP_RECORDS.id)
	})

  return label;
};

