import React, { useCallback, useState, useEffect } from "react";
import RecordList from "../RecordList";
import { useRecords } from "../../hooks/useRecords";

const RecordStack = ({ labelId }) => {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  // Three API calls is not ideal
  const published = useRecords({ labelId, state: "PUBLISHED" });
  const minted = useRecords({ labelId, state: "MINTED" });
  const drafted = useRecords({ labelId, state: "DRAFT" });

  console.log("RecordStack: published", published);
  console.log("RecordStack: minted", minted);
  console.log("RecordStack: drafted", drafted);

  return (
    <div className="row">
      <h2>Record Stack</h2>
      <button onClick={refresh}>Refresh</button>
      <br />
      <h3>Published</h3>
      <p>Live records</p>
      <RecordList items={published} />
      <hr />
      <h3>Minted</h3>
      <p>
        Records that have been uploaded and have been minted but are not
        published yet
      </p>
      <RecordList items={minted} />
      <hr />
    </div>
  );
};

export default RecordStack;
