import React, { useCallback, useState, useEffect } from "react";
import RecordList from "../RecordList";
import { DetailedRecordSlot } from "../RecordSlot.js";
import { useRecords } from "../../hooks/useRecords";

const RecordStack = ({ labelId }) => {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  // Multiple API calls is not ideal

  const minted = useRecords({ labelId, state: "MINTED", tick: version });

  console.log("RecordStack: minted", minted);
  // console.log("RecordStack: drafted", drafted);

  return (
    <div className="row">
      <h2>Record Stack</h2>
      <button onClick={refresh}>Refresh</button>
      <h3>Minted</h3>
      <p>
        Records that have been uploaded and have been minted but are not
        published yet
      </p>
      <RecordList items={minted} component={DetailedRecordSlot} />
      <hr />
    </div>
  );
};

export default RecordStack;
