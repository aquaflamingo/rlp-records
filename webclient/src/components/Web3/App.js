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

const ExperienceManager = () => {
}

const Web3App = () => {
  const [member, setMember] = useState(null)
  const [hasAccount, setHasAccount] = useState(false)

  // Fetch the ETH account from Web3 Provider
  const account = useETHAccounts()[0];

  // Query the backend to see if existing member with this address
  const foundMember = useMemberFromWalletAddress({walletAddress: account})

  // If member is current not set AND we found a member
  if (!member && !!foundMember) {
    setMember(foundMember)
    setHasAccount(true)
  }

  // If the onboarding was successful, proceed to refresh 
  // the member details and re-render
  const handleOnboardingSuccess = (d) => {
    console.log("Web3App.handleOnboardingSuccess: onboarding completed!")
    setMember(d.payload)
    setHasAccount(true)
  }

  return (
    <div className="Web3App">
      <main>
      { hasAccount ? <MemberApp member={member} walletAddress={account} /> : <Onboarding walletAddress={account} onSuccess={handleOnboardingSuccess}/>
    }
      </main>
    </div>
  );
};

const MemberApp = ({member}) => {
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
