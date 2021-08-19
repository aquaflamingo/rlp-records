import React, { useEffect, useState, useCallback } from "react";
import { create as CreateIPFSClient } from "ipfs-http-client";
import config from "../config";
import { ensureIPFSPrefix } from "../helpers/IPFS";

const IPFS_ADD_OPTIONS = {
  cidVersion: 1,
  hashAlg: "sha2-256",
};

export const useIPFS = () => {
  const [ipfsClient, setIPFSClient] = useState(null);

  useEffect(() => {
    setIPFSClient(CreateIPFSClient(config.IPFS_HTTP_API_URL));
    console.log("IPFS Client is Online");
  }, []);

  return ipfsClient;
};

export const useIPFSContentUpload = () => {
  const ipfs = useIPFS();

  const upload = useCallback(async (data) => {
    console.log("useIPFSContentUpload called with:", data);

    const { cid: assetCid } = await ipfs.add(
      { path: "/nft/" + data.basename, content: data.content },
      IPFS_ADD_OPTIONS
    );

    // Create the NFT metadata JSON
    const assetURI = ensureIPFSPrefix(assetCid) + "/" + data.basename;
    const metadata = { ...data.metadata, uri: assetURI };

    // add the metadata to IPFS
    const { cid: metadataCid } = await ipfs.add(
      { path: "/nft/metadata.json", content: JSON.stringify(metadata) },
      IPFS_ADD_OPTIONS
    );
    const metadataURI = ensureIPFSPrefix(metadataCid) + "/metadata.json";

    return {
      metadataURI: metadataURI,
      assetURI: assetURI,
    };
  });

  return upload;
};
