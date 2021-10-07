import React, { useCallback, useState, useEffect } from "react";
import { useEventRepository } from "../hooks/useRepository";

export const useCreateMintEvent = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const repo = useEventRepository();

	 /*
		* Request to create a new mint event on the API
		*
		* @param {string} proof - a tx hash with on chain proof of event
		* @param {string | int} recordId - id of the record
		* @param {string | int} token - id of the token on chain
		* @param {string} assetURI - a URI to the asset 
		* @param {string} metadataURI - a URI to the asset's metadata
		* @param {string} storageVenue - where the asset is stored
		*
		*/
  const request = ({ proof, recordId, tokenId, assetURI, metadataURI, storageVenue}) => {
    setResult((prev) => ({ ...prev, isLoading: true }));

    repo
      .createMintEvent({ proof, details: { recordId, tokenId, assetURI, metadataURI, storageVenue}})
      .then((res) => {
        setResult({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        console.error("Failed to mint record:", error);
        setResult({ data: [], isLoading: false, error });
      });
  };

  return [result, request];
}
