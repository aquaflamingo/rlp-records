import React, { useCallback, useState, useEffect } from "react";
import { useRecords } from "../hooks/useRecords";
import  useMint  from "../hooks/useMint";

const MintButton = ({onMint}) => {
	 const mintRequest = useMint()

	 const mintFn = async () => {
			const result = await mintRequest()
			onMint(result)
			console.log("Record was minted with id:",result)
	 }

	 return(
			 <button onClick={mintFn}>Mint</button>
	 )
}

const RecordSlot = ({ record }) => {
	 const [rec, setRecord] = useState(record)

	 const handleMint = (mintId) => {
			// TODO handle better
			rec.erc721Id = mintId
			rec.state = "MINTED"
			setRecord(rec)
	 }

  return (
    <div className="record">
      <h3>{rec.title}</h3>
      <h4>{rec.artist}</h4>
      <em>{rec.state}</em>
      {rec.hasNFT() && <p>Address: {rec.erc721Id}</p>}
			 { !rec.hasNFT() &&
					<MintButton onMint={handleMint} />
			 }
    </div>
  );
};

const RecordList = ({ items }) => {
  const hasItems = items && items.length > 0;
  let slots = [];

  if (hasItems) {
    slots = items.map((r, index) => <RecordSlot key={index} record={r}/>);
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
