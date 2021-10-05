import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEthersJs, useHardhat } from "./useEthers";
import { useIPFSContentUpload } from "./useIPFS";
import { useCreateMintEvent } from "./useCreateMintEvent";
import {
	 createFingerprintFileName,
	 buildFingerprint,
} from "./../helpers/Record";
import { removeIPFSPrefix } from "./../helpers/IPFS";

import Artifacts from "@rlprecords/contracts";

const RLPRecord = Artifacts.contracts.RLPRecord;

const useRLPRecordContract = () => {
	 const ethersjsInstance = useEthersJs();
	 const [contract, setContract] = useState([]);

	 useEffect(() => {
			if (ethersjsInstance === null) return;

			const rlpRecordContract = new ethers.Contract(
				 RLPRecord.address,
				 RLPRecord.abi,
				 // RLPRecord is ownable needs to be owner to interact
				 ethersjsInstance.getSigner(0)
			);

			setContract(rlpRecordContract);
	 }, [ethersjsInstance]);

	 return contract;
};

const useMintFlow = (account) => {
	 const contract = useRLPRecordContract();
	 const ethersjsInstance = useEthersJs();
	 const ipfsUploadRequest = useIPFSContentUpload();
	 const createMintEventRequest = useCreateMintEvent();

	 const request = useCallback(async (record) => {
			if (ethersjsInstance === null || ipfsUploadRequest === null) return;

			console.log("Mint request received, starting upload...");

			const uploadResult = await ipfsUploadRequest({
				 // track_name.fingerprint
				 basename: createFingerprintFileName(record.title),
				 // binary stream
				 content: record.fingerprint,
				 metadata: {
						title: record.title,
						artist: record.artist,
						labelId: record.labelId,
						released: new Date().getFullYear(),
				 },
			});

			console.log(
				 "Storage upload completed. URI: ",
				 uploadResult.assetURI,
				 "Metadata URI:",
				 uploadResult.metadataURI,
				 "Starting token mint..."
			);

			// Strip the IPFS prefix which is appended to the metadataURI.
			//
			// The RLPRecord contract appends the base prefix ipfs:// to
			// each tokenURI.
			const tokenMetadata = removeIPFSPrefix(uploadResult.metadataURI);

			const tx = await contract.mintToken(account, tokenMetadata);

			// The transaction receipt contains events emitted while processing the transaction.
			const receipt = await tx.wait();
			const erc721Token = parseMintTxResponse(receipt, {...uploadRequest})
			const mintEventResult = await createMintEventRequest(
				 { proof: tx.hash,
						recordId: record.id,
						tokenId: erc721Token.id,
						assetURI: erc721Token.assetURI,
						metadataURI: erc721Token.metadataURI,
						storageVenue: 'ipfs'
				 }
			)

			return erc721Token
	 }, [ethersjsInstance, createMintEventRequest, ipfsUploadRequest]);
	 return [result, request];
};

export default useMintFlow;

const parseMintTxResponse = (receipt, storageInformation) => {
	 console.log(
			"Token mint requested, received response.",
			"Filtering ",
			receipt.events.length,
			"events..."
	 );
	 for (const event of receipt.events) {
			if (event.event !== "Transfer") {
				 console.log("ignoring unknown event type ", event.event);
				 continue;
			}

			const tokenId = event.args.tokenId.toString();
			console.log("Token mint succeeded.");

			// const result = await createTokenRequest({tokenId: tokenId, metadataURI: uploadRequest.metadataURI, recordId: record.id})

			console.log(
				 "id:",
				 tokenId,
				 "assetURI:",
				 storageInformation.assetURI,
				 "metadataURI:",
				 storageInformation.metadataURI
			);

			// return nft id, asset and metadata
			return {
				 id: tokenId,
				 asset: {
						uri: storageInformation.assetURI,
						cid: removeIPFSPrefix(storageInformation.assetURI),
				 },
				 metadata: {
						uri: storageInformation.metadataURI,
						cid: removeIPFSPrefix(storageInformation.metadataURI),
				 },
			};
	 }
}
