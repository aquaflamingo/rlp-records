import mongoose from "mongoose";
import {RecordSchema} from "./Record";

export const RLPRecordTokenSchema = new mongoose.Schema({
	 Record: {type: mongoose.Schema.Types.ObjectId, ref: "Record",
  tokenId: String,
  metadataURI: String,
  assetURI: String,
});

const RLPRecordToken = mongoose.model(
  "RLPRecordToken",
  RLPRecordTokenSchema
);

export default RLPRecordToken
