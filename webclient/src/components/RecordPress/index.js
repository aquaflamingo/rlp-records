import React, { useCallback, useState, useEffect } from "react";
import PressRecordForm from "./PressRecordForm";
import { useRecords } from "../../hooks/useRecords";

const RecordPress = ({ labelId }) => {
  const [version, setVersion] = useState(0);
  const drafted = useRecords({ labelId, state: "DRAFT", tick: version });
  console.log("RecordPress: drafted", drafted);

  const refresh = useCallback(() => {
    setVersion((s) => s + 1);
  }, []);

  const handleSuccess = ({ token, hash }) => {
    alert(
      "Your record was pressed 🤙. Id: " + token.id + " Event hash: " + hash
    );
    setVersion(version + 1);
  };

  const handleFailure = ({ errors }) => {
    let err = Object.values(errors).join(", ");
    alert(err);
  };

  return (
    <div className="mint-record">
      <h2>🗜 Record Press</h2>
      <p>
        Here you can press out a fresh new release to the world. Pressing a
        record will mint an NFT and upload your audio fingerprint to IPFS.
      </p>

      <button onClick={refresh} style={{backgroundColor: "#2FF58E"}} >Fetch</button>

      <PressRecordForm
        labelId={labelId}
        draftedRecords={drafted}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </div>
  );
};

export default RecordPress;
