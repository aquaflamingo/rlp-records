import React, { useRef, useState, useEffect } from "react";
import RecordKitForm from "./RecordKitForm";

interface IRecordKitProps {
	 labelId : string
}

const RecordKit = ({ labelId } : IRecordKitProps) => {
  return (
    <div className="create-record">
      <h2>Record Kit</h2>
      <RecordKitForm labelId={labelId} />
    </div>
  );
};

export default RecordKit;
