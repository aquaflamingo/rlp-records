import mongoose from "mongoose";

export const RecordLabelSchema = new mongoose.Schema({
  name: String,
  established: String,
	 members: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

const RecordLabel = mongoose.model("RecordLabel", RecordLabelSchema);

export default RecordLabel
