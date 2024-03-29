import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEthersJs, useHardhat } from "./useEthers";
import { useIPFSContentUpload } from "./useIPFS";
import { useCreateMintEvent } from "./useCreateMintEvent";
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
  const [createEventResult, createMintEventRequest] = useCreateMintEvent();

  const request = useCallback(
    async ({ data, content }) => {
      if (ethersjsInstance === null || ipfsUploadRequest === null) return;

      console.log("Mint request received, starting upload...");

      const uploadResult = await ipfsUploadRequest({
        basename: "content.fp",
        // Encoded acoustic fingerprint
        content: content.encoded,
        metadata: {
          title: data.title,
          artist: data.artist,
          labelId: data.labelId,
          // Acoustic fingerprint hash
          searchHash: content.hash,
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
      const erc721Token = parseMintTxResponse(receipt, { ...uploadResult });

      console.log("ERC721 is", erc721Token);

      const mintEventResult = await createMintEventRequest({
        proof: tx.hash,
        recordId: data.id,
        tokenId: erc721Token.id,
        assetURI: erc721Token.asset.uri,
        metadataURI: erc721Token.metadata.uri,
        storageVenue: "ipfs",
      });

      console.log("Successfully minted the token");

      return [erc721Token, tx.hash];
    },
    [ethersjsInstance, createMintEventRequest, ipfsUploadRequest]
  );
  return [createEventResult, request];
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

    console.log(
      "id:",
      tokenId,
      "assetURI:",
      storageInformation.assetURI,
      "metadataURI:",
      storageInformation.metadataURI
    );

    // return token id, asset and metadata
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
};
