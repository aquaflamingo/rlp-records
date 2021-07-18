import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation.tsx";
import Sidebar from "./components/Sidebar.tsx";
import RecordStack from "./components/RecordStack.tsx";
import RecordKit from "./components/RecordKit/index.tsx";
import { useRecordLabel } from "./hooks/useRecordLabel.ts";

const Web3App = () : JSX.Element => {
  const labelId = useRecordLabel();

  return (
    <div className="Web3App">
      <Navigation brand={"RLP Records"} />
      <Sidebar labelId={labelId} />
      <RecordStack labelId={labelId} />
      <RecordKit labelId={labelId} />
    </div>
  );
};

export default Web3App;
