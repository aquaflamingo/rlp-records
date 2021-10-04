import React, { useCallback, useState, useEffect } from "react";
import { useERC721Repository } from "../hooks/useRepository";

export const useCreateERC721 = () => {
	 const repo = useERC721Repository();
	 const [result, setResult] = useState({
			data: null,
			error: null,
			isLoading: false,
	 });

	 const uploadRequest = useCallback(
			async({ metadataURI, tokenId, recordId }) => {
				 if (repo === null) return
				 setResult((prev) => ({...prev, isLoading:true}))

				 repo.create({tokenValues}).then((res) => {
							 setResult({data: res.data, isLoading: false, error: null});
						}).catch((err) => {
							 console.error("Failed to create token:", err)
							 setResult({data:[], isLoading: false, error})
						});

			}, [result])

	 return [result, uploadRequest];
};

export const useERC721 = ({recordId}) => {
  const repo = useERC721Repository();
	 const [token, setToken] = useState()

  useEffect(() => {
    repo
      ?.get({ recordId })
      .then((token) => {
        setToken(token);
      })
      .catch((err) => {
        console.error("Failed to fetch token", err);
        debugger;
      });
  }, [recordId, repo]);

  return token;
};
