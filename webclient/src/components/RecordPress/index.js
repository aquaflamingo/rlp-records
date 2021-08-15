import React, { useRef, useState, useEffect } from "react";
import MintForm from "./MintForm";
import { useRecords } from "../../hooks/useRecords";

const RecordPress = ({ labelId }) => {
	 const records = useRecords(labelId);

	 let drafted = []
	 if ( records ) {
			drafted = records.filter(rec => rec.isDraft())
	 }

	 console.log("RecordPress: drafted", drafted); 

  return (
    <div className="mint-record">
      <h2>Record Press</h2>
			 <p>Here you can press out a new release to the world</p>
      <MintForm labelId={labelId} draftedRecords={drafted} />
    </div>
  );
};

export default RecordPress;
