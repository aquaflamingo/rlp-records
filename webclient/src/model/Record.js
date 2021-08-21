import { RLP_RECORDS } from "./RecordLabel";
import { buildFingerprint } from "../helpers/Record";

// Endof Stubs

const RecordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  id: String,
  state: String,
  label: RecordLabel.schema,
  token: RLPRecordToken.schema,
  fingerprint: Buffer,
});

RecordSchema.methods.isPublished = () => {
  return this.state == "PUBLISHED";
};

RecordSchema.methods.isMinted = () => {
  return this.state == "MINTED";
};

RecordSchema.methods.isDraft = () => {
  return this.state == "DRAFT";
};

RecordSchema.methods.hasNFT = () => {
  return this.token !== undefined;
};

export const RECORD_STATES = {
  // Uploaded, processed, no NFT record, not published
  DRAFT: "DRAFT",
  // Uploaded, processed, has NFT record, not published
  MINTED: "MINTED",
  // Uploaded, processed, has NFT record, is published
  PUBLISHED: "PUBLISHED",
};

export const Record = mongoose.model("Record", RecordSchema);

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
