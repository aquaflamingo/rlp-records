import crypto from "crypto"

const RLP_RECORDS = {
  id: 1,
  name: "RLP Records",
  members: [
		 { name: "Vitalik Vibes" }, 
		 { name: "Wei da beats" }, 
		 { name: "Sats over" }, 
  ],
  established: 2021,
}

const REC_HASH_RATE = {
  erc721: { id: "", metadataURI: "" },
  state: "DRAFT",
  labelId: 1,
  title: "Hash Rate (Original Tech Mix)",
  artist: "Vitalik Vibes",
  audio: "",
  fingerprint: "010101010101",
  id: "1",
}

REC_HASH_RATE.isPublished = false
REC_HASH_RATE.isDraft = true
REC_HASH_RATE.isMinted = false
REC_HASH_RATE.hasNft = false



export {
	 RLP_RECORDS,
	 REC_HASH_RATE
}
