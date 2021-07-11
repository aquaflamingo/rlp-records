import React, { useState, useEffect } from "react";
import { useRecords } from "../hooks/useRecords"

const RecordSlot = ({ record }) => {
	 return (
			<div className="record"> 
				 <h3>{record.title}</h3>
				 <h4>{record.artist}</h4>
				 <em>{record.state}</em>
				 {
						record.hasNFT() &&
							 <p>Address: {record.nftAddress}</p>
				 }

			</div>
	 )
}

const RecordList = ({records}) => {
	 const hasItems = records && records.length > 0
	 let slots = []

	 if (hasItems) {
			slots = records.map((r,index) => <RecordSlot key={index} record={r} />)
	 }

	 return (
			<div className="record-list">
				 { hasItems ? slots : <p> No Records found for this label</p> }
			</div>
	 )
}

const RecordStack = ({ labelId }) => {
	 const records = useRecords(labelId) 
	 console.log("records ", records)

	 return (
			<div className="row">
				 <h2>Record Stack</h2>
				 <RecordList
						records={records}
				 />
			</div>
	 )
}

export default RecordStack
