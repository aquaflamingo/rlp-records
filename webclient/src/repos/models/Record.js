export const RecordDeserializer = (data) => {
	 const {artist, title, state, token} = data.attributes
	 const {recordlabel} = data.relationships

	 return {
			type: data.type,
			id: data.id,
			artist: artist,
			title: title,
			state: state,
			token: token,
			label: recordlabel.data,
	 }
}

