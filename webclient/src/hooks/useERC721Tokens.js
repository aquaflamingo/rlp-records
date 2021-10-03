import React, { useCallback, useState, useEffect } from "react";
import { useERC721TokenRepository } from "../hooks/useRepository";

export const useCreateERC721 = ({ metadataURI, tokenId, recordId }) => {
	 const repo = useERC721TokenRepository();
	 const [result, setResult] = useState({
			data: null,
			error: null,
			isLoading: false,
	 });

	 const uploadRequest = useCallback(
			async(tokenValues) => {
				 if (repo === null) return
				 setResult((prev) => ({...prev, isLoading:true})

				 repo.create({tokenvalues: tokenValues})
						.then((res) => {
							 setResult({data: res.data, isLoading: false, error: null});
						}).catch((err) => {
							 console.error("Failed to create token:", err)
							 setResult({data:[], isLoading: false, error})
						});

			}, [result])

	 return [result, uploadRequest];
};

export const useERC721 = ({recordId}) => {
  const repo = useERC721TokenRepository();
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
