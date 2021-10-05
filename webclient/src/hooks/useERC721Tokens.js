import React, { useCallback, useState, useEffect } from "react";
import { useERC721Repository } from "../hooks/useRepository";

export const useCreateMintEvent = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const repo = useERC721Repository();

  const request = (proof, recordId, tokenId, metadataURI) => {
    setResult((prev) => ({ ...prev, isLoading: true }));

    repo
      .createMintEvent({ proof, recordId, tokenId, metadataURI})
      .then((res) => {
				 debugger
        // FIXME: error if data is not array
        setResult({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        console.error("Failed to mint record:", error);
        setResult({ data: [], isLoading: false, error });
      });
  };

  return [result, request];
}
