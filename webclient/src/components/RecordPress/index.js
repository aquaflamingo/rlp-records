import React, { useCallback, useState, useEffect } from "react";
import PressRecordForm from "./PressRecordForm";
import { useRecords } from "../../hooks/useRecords";

const RecordPress = ({ labelId }) => {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  const drafted = useRecords({ labelId, state: "DRAFT" });

  console.log("RecordPress: drafted", drafted);

  return (
    <div className="mint-record">
      <h2>Record Press</h2>
      <button onClick={refresh}>Fetch</button>
      <p>Here you can press out a fresh new release to the world.</p>
      <PressRecordForm labelId={labelId} draftedRecords={drafted} />
    </div>
  );
};

export default RecordPress;
