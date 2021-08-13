import React, { useCallback, useState, useEffect } from "react";
import { useRecords } from "../hooks/useRecords";
import  useMint  from "../hooks/useMint";

// Build fingerprint file
// Store fingerprint file in IPFS
// 	--> Get content asset id
// Store metadata as JSON
// 	--> Get Asset URI
// 	Mint token to that URI
//
const MintButton = ({mintable, onMint}) => {
	 const mintRequest = useMint(mintable)
	 const tmpToAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

	 const mintFn = async () => {
			const result = await mintRequest(tmpToAddress)
			onMint(result)
			console.log("Record was minted", result)
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

	 console.log("Rendering RecordSlot", record.title)

	 return (
			<div className="record">
				 <h3>{rec.title}</h3>
				 <h4>{rec.artist}</h4>
				 <em>{rec.state}</em>
				 {rec.hasNFT() && <p>Id: {rec.erc721Id}</p>}
				 { !rec.hasNFT() &&
						<MintButton mintable={rec} onMint={handleMint} />
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
