import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import RecordStack from "../RecordStack";
import RecordKit from "../RecordKit/";
import RecordPress from "../RecordPress/";
import { useRecordLabel } from "../../hooks/useRecordLabel";
import { useUserFromWallet } from "../../hooks/useUser";

const Web3App = () => {
  // FIXME: how to query for record label without account
  const acc = useETHAccounts();
  // FIXME: does this even work?
  const user = userUserFromWallet({walletAddress: acc});

  return (
    <div className="Web3App">
      <main>
        <Navigation brand={"RLP Records"} />
        // TODO: Need to segment the having user from not having user experience for onboarding 
        // isUser ? : MainApp : Onboarding
      </main>
    </div>
  );
};

const Onboarding = () => {
  // TODO:
  //
  // 1. Create user identity profile on click of button
  // 2. Ask to join a new label
  // 3. Ask for the name 
  // 4. PUT for label and POST for create a member 
  // 
  return(
    <div>
      <p>This will be a step by step wizard flow</p>
    </div>
  )
}

const MainApp = () => {
  const labelId = useRecordLabel();

  return(
      <Sidebar labelId={labelId} />
      <RecordStack labelId={labelId} />
      <RecordPress labelId={labelId} />
      <RecordKit labelId={labelId} />
    )
}

export default Web3App;
