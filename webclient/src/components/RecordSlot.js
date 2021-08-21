import React, { useCallback, useState, useEffect } from "react";

export const BasicRecordSlot = ({ record }) => {
  const [rec, setRecord] = useState(record);
  return (
    <div className="record">
      <h3>{rec.title}</h3>
      <p>{rec.artist}</p>
      <em>{rec.state}</em>
      {rec.hasNFT() && <p>RLP{rec.erc721Id}</p>}
    </div>
  );
};
