import { Member } from "./Member";

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

const RecordLabelSchema = new mongoose.Schema({
  name: String,
  established: String,
  members: [Member.schema],
});

export const RecordLabel = mongoose.model("RecordLabel", RecordLabelSchema);
