import mongoose from "mongoose";
import { Record } from "./Record";

const RLPRecordTokenSchema = new mongoose.Schema({
  Record: Record.schema,
  tokenId: String,
  metadataURI: String,
  assetURI: String,
});

export const RLPRecordToken = mongoose.model(
  "RLPRecordToken",
  RLPRecordTokenSchema
);
