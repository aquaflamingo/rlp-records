import React, { useState, useEffect } from "react";
import { useMemberRepository } from "../hooks/useRepository";

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
