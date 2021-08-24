import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEthersJs, useHardhat } from "./useEthers";
import { useIPFSContentUpload } from "./useIPFS";
import {
  createFingerprintFileName,
  buildFingerprint,
} from "./../helpers/Record";
import { removeIPFSPrefix } from "./../helpers/IPFS";

import Artifacts from "rlp-record-contracts";

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

const useMint = (account) => {
  const contract = useRLPRecordContract();
  const ethersjsInstance = useEthersJs();
  const uploadRequest = useIPFSContentUpload();

  const mintRequest = useCallback(
    async (record) => {
      if (ethersjsInstance === null || uploadRequest === null) return;

      console.log("Mint request received...");
      console.log("Starting upload...");

      const uploadResult = await uploadRequest({
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
        "Upload completed. URI: ",
        uploadResult.assetURI,
        "Metadata URI:",
        uploadResult.metadataURI
      );
      console.log("Minting token...");

      // Strip the IPFS prefix which is appended to the metadataURI.
      //
      // The RLPRecord contract appends the base prefix ipfs:// to
      // each tokenURI.
      const tokenMetadata = removeIPFSPrefix(uploadResult.metadataURI);

      const tx = await contract.mintToken(account, tokenMetadata);
      // The transaction receipt contains events emitted while processing the transaction.
      const receipt = await tx.wait();
      console.log(
        "Token mint requested, received response.",
        "Filtering ",
        receipt.events.length,
        "events..."
      );

      console.log(receipt.events);
      for (const event of receipt.events) {
        if (event.event !== "Transfer") {
          console.log("ignoring unknown event type ", event.event);
          continue;
        }

        const tokenId = event.args.tokenId.toString();
        console.log("Token mint succeeded.");

        console.log(
          "id:",
          tokenId,
          "assetURI:",
          uploadResult.assetURI,
          "metadataURI:",
          uploadResult.metadataURI
        );

        // return nft id, asset and metadata
        return {
          id: tokenId,
          asset: {
            uri: uploadResult.assetURI,
            cid: removeIPFSPrefix(uploadResult.assetURI),
          },
          metadata: {
            uri: uploadResult.metadataURI,
            cid: removeIPFSPrefix(uploadResult.metadataURI),
          },
        };
      }
    },
    [ethersjsInstance, uploadRequest]
  );

  return mintRequest;
};

export default useMint;
