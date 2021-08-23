import RecordLabel from "./RecordLabel"


export const RLP_RECORDS = RecordLabel({
  id: 1,
  name: "RLP Records",
  members: [
    Member({ name: "Vitalik Vibes" }),
    Member({ name: "Wei Da Beats" }),
    Member({ name: "Sats OVer" }),
  ],
  established: 2021,
});

export const REC_HASH_RATE = Record({
  erc721: { id: "", metadataURI: "" },
  state: RECORD_STATES.DRAFT,
  labelId: RLP_RECORDS.id,
  title: "Hash Rate (Original Tech Mix)",
  artist: "Vitalik Vibes",
  audio: "",
  // TODO how to build fingerprint from audio
  fingerprint: buildFingerprint(""),
  id: "1",
});
