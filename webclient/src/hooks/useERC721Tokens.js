import React, { useCallback, useState, useEffect } from "react";
import { useERC721Repository } from "../hooks/useRepository";

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
