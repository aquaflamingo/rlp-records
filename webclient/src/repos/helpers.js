export const deserializeResponse = (response, deserializer) => {
	 let result = []
	 let dataModels = response.data.data

	 for (var m=0; m<dataModels.length; m++) {

			result.push(deserializer(dataModels[m]))
	 }
	 return result
}
