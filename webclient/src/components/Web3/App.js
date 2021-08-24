import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import RecordStack from "../RecordStack";
import RecordKit from "../RecordKit/";
import RecordPress from "../RecordPress/";
import { useRecordLabel } from "../../hooks/useRecordLabel";

const Web3App = () => {
  const labelId = useRecordLabel();

  return (
    <div className="Web3App">
      <Navigation brand={"RLP Records"} />
      <Sidebar labelId={labelId} />
      <RecordStack labelId={labelId} />
      <RecordPress labelId={labelId} />
      <RecordKit labelId={labelId} />
    </div>
  );
};

export default Web3App;
