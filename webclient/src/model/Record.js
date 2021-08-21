// FIXME: Temporary
// Stubs
import { RLP_RECORDS } from "./RecordLabel";
import { buildFingerprint } from "../helpers/Record";

// Endof Stubs

export const RECORD_STATES = {
  // Uploaded, processed, no NFT record, not published
  DRAFT: "DRAFT",
  // Uploaded, processed, has NFT record, not published
  MINTED: "MINTED",
  // Uploaded, processed, has NFT record, is published
  PUBLISHED: "PUBLISHED",
};

// Record is an entity that represents an musical audio work
// TODO - has attached audio
export const Record = ({ erc721, state, labelId, title, artist, id }) => {
  const isPublished = () => state == RECORD_STATES.PUBLISHED;
  const isMinted = () => state == RECORD_STATES.MINTED;
  const isDraft = () => state == RECORD_STATES.DRAFT;
  const hasNFT = () =>
    state == RECORD_STATES.MINTED || state == RECORD_STATES.PUBLISHED;

  return {
    title: title,
    artist: artist,
    id: id,
    state: state,
    labelId: labelId,

    // Blockchain
    erc721: erc721,
    // endof Blockchain

    // Functions
    isDraft: isDraft,
    isPublished: isPublished,
    isMinted: isMinted,
    hasNFT: hasNFT,
    // endof Functions
  };
};

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
