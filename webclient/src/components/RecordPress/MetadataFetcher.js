import React, { useRef, useState, useEffect } from "react";
import { useRecordMetadata} from "../../hooks/useRecords";

const MetadataFetcher = ({recordId}) => {
  const md = useRecordMetadata(recordId)
  const [recordSelected, setRecordSelected] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (recordId == "") {
			 setRecordSelected(false);
		}
    else {
			 setRecordSelected(true);
		}
  }, [recordId]);

	 const handleFetchMetadata = async (e) => {
			e.preventDefault()

			setTick(tick+1)
	 }

	 return (
			<div>
				 <code>
						Metadata Result: 
						{ md ? `fp: ${data.fp.encoded}`: null }
				 </code>
				 <br/>

				 <button disabled={!recordSelected} onClick={handleFetchMetadata}>
					 Fetch Metadata
				 </button>
			</div>
	 )
}

export default MetadataFetcher
