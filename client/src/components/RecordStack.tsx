import React, { useCallback, useState, useEffect } from "react";
import { useRecords } from "../hooks/useRecords";
import { Record } from "../model/Record";

const RecordSlot = (record : Record) => {
  return (
    <div className="record">
      <h3>{record.title}</h3>
      <h4>{record.artist}</h4>
      <em>{record.state}</em>
      {record.hasNFT() && <p>Address: {record.nftAddress}</p>}
    </div>
  );
};

const RecordList = ({ items }) => {
  const hasItems = items && items.length > 0;
  let slots = [];

  if (hasItems) {
    slots = items.map((r, index) => <RecordSlot key={index} record={r} />);
  }

  return (
    <div className="record-list">
      {hasItems ? slots : <p> No items found for this label</p>}
    </div>
  );
};

const RefreshableList = ({ refresh, items }) => {
  return (
    <div className="record-list">
      <RecordList items={items} />
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

const RecordStack = ({ labelId }) => {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  const records = useRecords(labelId);
  console.log("RecordStack: records ", records);

  return (
    <div className="row">
      <h2>Record Stack</h2>
      <RefreshableList refresh={refresh} items={records} />
    </div>
  );
};

export default RecordStack;
