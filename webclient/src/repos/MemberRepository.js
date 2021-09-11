import client from "./ApiClient"
import { MemberDeserializer } from "./models/Member.js"
import { deserializeResponse } from "./helpers.js"

// RecordLabelRepository is the data access interface  for labels
class MemberRepository {
	 constructor() {
			this.URI = "/members/"
	 }

	 async list({labelId}) {
			try {
				 const response = await client.get(`${this.URI}?recordlabel=${labelId}`)

				 const result = deserializeResponse(response, MemberDeserializer)

				 console.log(response);
				 return result
			} catch (error) {
				 console.error(error);
				 return null
			}
	 }
}

export default MemberRepository;
