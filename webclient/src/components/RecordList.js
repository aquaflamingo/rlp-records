import React, { useCallback, useState, useEffect } from "react";
import { BasicRecordSlot } from "./RecordSlot";

const RecordList = ({ items, component }) => {
  const hasItems = items && items.length > 0;
  let slots = [];

  if (hasItems) {
    // Dynamically render component
    slots = items.map((r, index) =>
      React.createElement(component, {
        key: index,
        record: r,
      })
    );
  }

  return (
    <div className="record-list">
      {hasItems ? slots : <p> No items found for this label</p>}
    </div>
  );
};

export default RecordList;
