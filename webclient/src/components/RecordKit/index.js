import React, { useRef, useState, useEffect } from "react";
import UploadDraftForm from "./UploadDraftForm";

const RecordKit = ({ labelId }) => {
  return (
    <div className="create-record">
      <h2>💽 Record Kit</h2>
      <p>This is where you draft and upload your new record</p>
      <UploadDraftForm labelId={labelId} />
    </div>
  );
};

export default RecordKit;
