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

const MintButton = ({ mintable, onMint }) => {
  const mintRequest = useMint(mintable);
  const tmpToAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  const mintFn = async () => {
    // TODO how to refactor this up so it makes sense
    const result = await mintRequest({ toAddress: tmpToAddress });
    onMint(result);
    console.log("Record was minted", result);
  };

  return <button onClick={mintFn}>Mint</button>;
};

