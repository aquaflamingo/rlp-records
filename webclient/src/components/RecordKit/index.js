import React, { useRef, useState, useEffect } from "react";
import UploadDraftForm from "./UploadDraftForm";

const RecordKit = ({ labelId }) => {
  return (
    <div className="create-record">
      <h2>Record Kit</h2>
      <UploadDraftForm labelId={labelId} />
    </div>
  );
};

export default RecordKit;
