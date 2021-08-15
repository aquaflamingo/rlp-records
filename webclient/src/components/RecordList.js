import React, { useCallback, useState, useEffect } from "react";
import { BasicRecordSlot } from "./RecordSlot"

const RecordList = ({ items }) => {
  const hasItems = items && items.length > 0;
  let slots = [];

  if (hasItems) {
    slots = items.map((r, index) => <BasicRecordSlot key={index} record={r} />);
  }

  return (
    <div className="record-list">
      {hasItems ? slots : <p> No items found for this label</p>}
    </div>
  );
};

export default RecordList;
