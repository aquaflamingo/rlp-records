import RecordLabel from "./RecordLabel"
import Record, {RECORD_STATES}from "./Record"
import Member from "./Member"
import {buildFingerprint} from "../helpers/Record"

export const RLP_RECORDS = {
  id: 1,
  name: "RLP Records",
  members: [
    new Member({ name: "Vitalik Vibes" }),
    new Member({ name: "Wei Da Beats" }),
    new Member({ name: "Sats OVer" }),
  ],
  established: 2021,
}

export const REC_HASH_RATE = {
  erc721: { id: "", metadataURI: "" },
  state: "DRAFT",
  labelId: 1,
  title: "Hash Rate (Original Tech Mix)",
  artist: "Vitalik Vibes",
  audio: "",
  // TODO how to build fingerprint from audio
  fingerprint: buildFingerprint(""),
  id: "1",
}
