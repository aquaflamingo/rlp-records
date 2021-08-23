import mongoose from "mongoose";
import { RLP_RECORDS } from "./Fixture";
import { buildFingerprint } from "../helpers/Record";

export const RECORD_STATES = {
  // Uploaded, processed, no NFT record, not published
  DRAFT: "DRAFT",
  // Uploaded, processed, has NFT record, not published
  MINTED: "MINTED",
  // Uploaded, processed, has NFT record, is published
  PUBLISHED: "PUBLISHED",
};


export const RecordSchema = new mongoose.Schema({
  title: String,
  artist: String,
  id: String,
	 state: {type: String, enum: RECORD_STATES},
	 label: {type: mongoose.Schema.Types.ObjectId, ref: 'RecordLabel'},
	 token: {type: mongoose.Schema.Types.ObjectId, ref: 'Token'},
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

const Record = mongoose.model("Record", RecordSchema);

export default Record;

