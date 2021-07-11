import { Member } from "./Member";

// RecordLabel is a entity that publishes and owns music
export const RecordLabel = ({id, name, members, established}) => {
	 return {
			id: id,
			name: name,
			established: established,
			members: members
	 }
}


export const RLP_RECORDS = RecordLabel(
	 {
			id: 1,
			name: "RLP Records",
			members: [
				 Member({name: "Vitalik Vibes"}),
				 Member({name: "Wei Da Beats"}),
				 Member({name: "Sats OVer"})
			],
			established: 2021
	 }
)
