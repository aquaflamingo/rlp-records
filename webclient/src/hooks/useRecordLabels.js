import React, { useState, useEffect } from "react";
import { useRecordLabelRepository } from "./useRepository";

export const useRecordLabels = () => {
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
