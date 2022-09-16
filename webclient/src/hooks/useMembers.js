import React, { useState, useEffect } from "react";
import { useMemberRepository } from "../hooks/useRepository";

//
// Creates a new member record using the provided
// data to the request call.
//
export const useCreateMember = () => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    isLoading: false,
  });

  const repo = useMemberRepository();

  const request = ({ name, labelId, walletAddress }) => {
    return new Promise((s, e) => {
      setResult((prev) => ({ ...prev, isLoading: true }));

      repo
        .createMember({ labelId, name, walletAddress })
        .then((res) => {
          console.log("Member was created", res);

          let data = {
            msg: "Member was created 👶",
            success: true,
            payload: res,
          };

          setResult({
            data: data,
            isLoading: false,
            error: null,
          });

          s(data);
        })
        .catch((error) => {
          console.error("Failed to create Member:", error);
          let data = { success: false };
          // debugger;
          setResult({
            data: data,
            isLoading: false,
            error: `Failed to create member: ${error.response.data}`,
          });

          e(data);
        });
    });
  };

  return [result, request];
};

//
// Retrieves an individual member record from
// the wallet address provided as prop input.
//
export const useMemberFromWalletAddress = ({ walletAddress }) => {
  const [u, setUser] = useState(null);

  const repo = useMemberRepository();

  useEffect(() => {
    repo
      ?.getFromWallet({ walletAddress })
      .then((m) => {
        if (m) {
          console.log("Fetched user from wallet", m.name);
          setUser(m);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch member", err);
        debugger;
      });
  }, [walletAddress, repo]);

  return u;
};

export const useMembers = (labelId) => {
  const [members, setMembers] = useState(null);
  const repo = useMemberRepository();

  useEffect(() => {
    repo
      ?.list({ labelId })
      .then((members) => {
        setMembers(members);
      })
      .catch((err) => {
        console.error("Failed to fetch label members", err);
        debugger;
      });
  }, [labelId, repo]);

  return members;
};
