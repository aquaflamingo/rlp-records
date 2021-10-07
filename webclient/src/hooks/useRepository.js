import React, { useState, useEffect } from "react";
import RecordRepository from "../repos/RecordRepository";
import RecordLabelRepository from "../repos/RecordLabelRepository";
import MemberRepository from "../repos/MemberRepository";
import ERC721Repository from "../repos/ERC721Repository";
import EventRepository from "../repos/EventRepository";

// Returns the record repository structure
export const useEventRepository = () => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const eventRepo = new EventRepository();

    setRepo(eventRepo);
  }, []); // Empty array prevents infinite rerender

  return repo;
};

// Returns the record repository structure
export const useERC721Repository = () => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const erc721Repo = new ERC721Repository();

    setRepo(erc721Repo);
  }, []); // Empty array prevents infinite rerender

  return repo;
};

// Returns the record repository structure
export const useRecordRepository = () => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const recordRepo = new RecordRepository();

    setRepo(recordRepo);
  }, []); // Empty array prevents infinite rerender

  return repo;
};

// Returns the record label repository structure
export const useRecordLabelRepository = (labelId) => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const labelRepo = new RecordLabelRepository();

    setRepo(labelRepo);
  }, []);

  return repo;
};

// Returns the record label repository structure
export const useMemberRepository = (labelId) => {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const r = new MemberRepository();

    setRepo(r);
  }, []);

  return repo;
};
