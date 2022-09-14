import React, { useCallback, useState, useEffect } from "react";

export const BasicRecordSlot = ({ record }) => {
  const [rec, setRecord] = useState(record);

  console.log("What is rec")
  console.log(rec.token)
  return (
    <div className="record">
      <h3>{rec.title}</h3>
      <p>{rec.artist}</p>
      <em>{rec.state}</em>
      {rec.hasNft && <p>RLP{rec.erc721Id}</p>}
    </div>
  );
};
