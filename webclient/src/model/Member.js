import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema({
	 name: String
})

export const Member = mongoose.model("Member", MemberSchema)

