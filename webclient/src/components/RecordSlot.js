import React, { useCallback, useState, useEffect } from "react";
import { useRecordMetadata } from "../hooks/useRecords.js"

export const BasicRecordSlot = ({ record }) => {
  const [rec, setRecord] = useState(record);

  return (
    <div className="record">
      <h3>{rec.title}</h3>
      <p>{rec.artist}</p>
      <em>{rec.state}</em>
    </div>
  );
};


export const DetailedRecordSlot = ({ record }) => {
  const [rec, setRecord] = useState(record);

  // FIXME: Yes making iterative API calls for each record's meta data is bad, fix at some point
  const metadata = useRecordMetadata(record.id)

  console.log("What is record", record)
  console.log("What is md", metadata)
  return (
    <div className="record">
      <h3>{rec.title}</h3>
       <p>{rec.artist}</p>
      <em>{rec.state}</em>
      { metadata && <RecordMetadata data={metadata} />}
    </div>
  );
};

const RecordMetadata = ({data}) => {
  return(
    <div>
      <p>Search Hash: {data.fp.searchhash} </p> 
      <p>Blockchain Hash: {data.token.proof} </p> 
      <p>Token Id: {data.token.id} </p> 
      <p>Data URI: {data.token.metadata_uri} </p> 
    </div>
  )
}

