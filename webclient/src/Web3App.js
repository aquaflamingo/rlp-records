import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import RecordStack from "./components/RecordStack";
import RecordKit from "./components/RecordKit/";
import RecordPress from "./components/RecordPress/";
import { useRecordLabel } from "./hooks/useRecordLabel";

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
