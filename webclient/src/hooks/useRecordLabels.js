import React, { useState, useEffect } from "react";
import { useRecordLabelRepository } from "./useRepository";

export const useRecordLabel = () => {
  const [label, setlabel] = useState(null);

  useEffect(() => {
    setlabel();
  });

  return label;
};
export const useRecordLabels = () => {
  // FIXME - reach out to chain to get record label membership
  const [labels, setLabels] = useState(null);

  const repo = useRecordLabelRepository();

  useEffect(() => {
    repo
      ?.list()
      .then((recLabels) => {
        if (recLabels) {
          console.log("Fetched ", recLabels.length, " labels");
          setLabels(recLabels);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch record labels", err);
        debugger;
      });
  }, [repo]);

  return labels;
};
