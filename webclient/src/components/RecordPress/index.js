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
    // TODO modal
    alert(err);
  };

  return (
    <div className="mint-record">
      <h2>Record Press</h2>
      <button onClick={refresh}>Fetch</button>
      <p>Here you can press out a fresh new release to the world.</p>
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
