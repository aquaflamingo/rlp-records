import React, { useCallback, useState, useEffect } from "react";
import RecordList from "../RecordList";
import { useRecords } from "../../hooks/useRecords";
import useMint from "../../hooks/useMint";

//
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

const RecordStack = ({ labelId }) => {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  const records = useRecords(labelId);
  let published,
    minted,
    drafted = [];

  if (records) {
    published = records.filter((rec) => rec.isPublished());
    minted = records.filter((rec) => rec.isMinted());
  }

  console.log("RecordStack: published", published);
  console.log("RecordStack: minted", minted);

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
