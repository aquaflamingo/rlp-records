import mongoose from "mongoose";

export const MemberSchema = new mongoose.Schema({
  name: String,
});

const Member = mongoose.model("Member", MemberSchema);

export default Member;
