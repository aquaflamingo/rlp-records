	 import  Member  from "./Member";

const RecordLabelSchema = new mongoose.Schema({
  name: String,
  established: String,
  members: [Member.schema],
});

export const RecordLabel = mongoose.model("RecordLabel", RecordLabelSchema);
