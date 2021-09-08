import client from "./ApiClient"

// RecordLabelRepository is the data access interface  for labels
class MemberRepository {
	 constructor() {
			this.URI = "/members/"
	 }

  async list({labelId}) {
			try {
				 const response = await client.get(`${this.URI}?recordlabel=${labelId}`)

				 // TODO map to object
				 return response.data
				 console.log(response);
			} catch (error) {
				 console.error(error);
				 return null
			}
  }
}

export default MemberRepository;
