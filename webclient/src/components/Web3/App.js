import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import RecordStack from "../RecordStack";
import RecordKit from "../RecordKit/";
import RecordPress from "../RecordPress/";
import Onboarding from "../Onboarding/";
import { useRecordLabel } from "../../hooks/useRecordLabels";
import { useMemberFromWalletAddress } from "../../hooks/useMembers";
import { useETHAccounts } from "../../hooks/useEthers.js";

const Web3App = () => {
  const acc = useETHAccounts();
  const user = useMemberFromWalletAddress({walletAddress: acc});

  const isUser = !user 

  return (
    <div className="Web3App">
      <main>
        <Navigation brand={"RLP Records"} />
        { isUser && <MainApp user={user}/>  }
        { !isUser && <Onboarding walletAddress={acc} /> }
      </main>
    </div>
  );
};

const MainApp = () => {
  // FIXME: how to query for record label without account
  const labelId = 1;

  return(
    <div>
      <Sidebar labelId={labelId} />
      <RecordStack labelId={labelId} />
      <RecordPress labelId={labelId} />
      <RecordKit labelId={labelId} />
    </div>
    )
}

export default Web3App;
