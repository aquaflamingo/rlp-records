// FIXME: Temporary 
// Stubs
import { RLP_RECORDS } from "./RecordLabel"

// Endof Stubs

const RECORD_STATES = {
	 // Uploaded, processed, no NFT record, not published
	 DRAFT: 'DRAFT',
	 // Uploaded, processed, has NFT record, not published
	 MINTED: 'MINTED',
	 // Uploaded, processed, has NFT record, is published
	 PUBLISHED: 'PUBLISHED'
}

// Record is an entity that represents an musical audio work 
// TODO - has attached audio
export const Record = (
	 {nftAddress, state, labelId, title, artist }
) => {
	 const isPublished = () => { state == RECORD_STATES.PUBLISHED }
	 const isMinted = () => { state == RECORD_STATES.MINTED }
	 const isDraft = () => { state == RECORD_STATES.DRAFT }
	 const hasNFT = () => { state == RECORD_STATES.MINTED || state == RECORD_STATES.PUBLISHED }

	 return {
			nftAddress: nftAddress,
			state: state,
			labelId: labelId,
			// Functions
			isDraft: isDraft,
			isPublished: isPublished,
			isMinted: isMinted,
			hasNFT: hasNFT,
			// endof Functions

			// Temporary - would pull from NFT record.txt for metadata 
			// TODO - RecordMetaData
			title: title,
			artist: artist
	 }
}

export const REC_HASH_RATE = Record(
	 {
			nftAddress: '',
			state: RECORD_STATES.DRAFT,
			labelId: RLP_RECORDS.id,
			title: 'Hash Rate (Original Tech Mix)',
			artist: 'Vitalik Vibes'
	 }
)
