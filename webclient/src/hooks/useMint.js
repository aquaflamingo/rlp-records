import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEthersJs, useHardhat } from "./useEthers";
import { useIPFSContentUpload } from "./useIPFS";
import { createFingerprintFileName, buildFingerprint } from "./../helpers/Record";

import Artifacts from "../contracts"

const RLPRecord = Artifacts.contracts.RLPRecord

const useRLPRecordContract = () => {
	 const ethersjsInstance = useEthersJs();
	 const [contract, setContract] = useState([]);

	 useEffect(() => {
			if (ethersjsInstance === null)
				 return;

	 const rlpRecordContract = new ethers.Contract(
				 RLPRecord.address,
				 RLPRecord.abi,
				 // RLPRecord is ownable needs to be owner to interact
				 ethersjsInstance.getSigner(0)
			 );

			setContract(rlpRecordContract)

	 }, [ethersjsInstance])

	 return contract;
}

const useMint = (record) => {
	 const contract = useRLPRecordContract();
	 const ethersjsInstance = useEthersJs();
	 const uploadRequest = useIPFSContentUpload()

	 const mintRequest = useCallback(async ({toAddress}) => {
			if (ethersjsInstance === null || uploadRequest === null)
				 return;

			console.log("Mint request received...")
			console.log("Starting upload...")

			const uploadResult = await uploadRequest({
				 // track_name.fingerprint
				 basename: createFingerprintFileName(record.title),
				 // binary stream
				 content: buildFingerprint(record.audio),
				 metadata: {
						title: record.title, 
						artist: record.artist, 
						labelId: record.labelId,
						released: new Date().getFullYear()
				 }
			})

			console.log("Upload completed. URI: ", uploadResult.assetURI, "Metadata URI:", uploadResult.metadataURI)
			console.log("Minting token...")

			const tx = await contract.mintToken(toAddress, uploadResult.metadataURI)
        // The transaction receipt contains events emitted while processing the transaction.
        const receipt = await tx.wait()
			  console.log("Token mint requested, received response. Filtering events...")
        for (const event of receipt.events) {
            if (event.event !== 'Transfer') {
                console.log('ignoring unknown event type ', event.event)
                continue
            }
			  console.log("Token mint requested, received response. Filtering events...")
				 
					 // return nft id, assetURI and metadata
            return {
							 id: event.args.tokenId.toString(),
							 assetURI: uploadResult.metadataURI,
							 metadataURI: uploadResult.assetURI
						}
        }
	 }, [ethersjsInstance, uploadRequest]);

	 return mintRequest;
};

export default useMint
