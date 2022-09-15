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

const ApplicatonManager = () => {
  const account = useETHAccounts()[0];
  const user = useMemberFromWalletAddress({walletAddress: account})

  const [member, setMember] = useState(user)

  const hasAccount = member 

  const handleOnboardingSuccess = (d) => {
    console.log("Reloading!!")
    setMember(d)
  }

  return (
    <div>
      { hasAccount ? <MainApp user={user} /> : <Onboarding walletAddress={account} onSuccess={handleOnboardingSuccess}/>
    }
    </div>
  )
}

const Web3App = () => {

  return (
    <div className="Web3App">
      <main>
        <ApplicatonManager />
      </main>
    </div>
  );
};

const MainApp = ({member}) => {
  return(
    <div>
      <Navigation brand={"RLP Records"} member={member}/>
      <Sidebar labelId={member.labelId} />
      <RecordStack labelId={member.labelId} />
      <RecordPress labelId={member.labelId} />
      <RecordKit labelId={member.labelId} />
    </div>
  )
}

export default Web3App;
