import client from "./ApiClient";
import Base from "./Base";
import { RecordDeserializer } from "./models/Record.js";

// RecordRepository is the data access interface for record
class RecordRepository extends Base {
  constructor() {
    super();
    this.URI = "/records/";
  }

  // Returns all records associated with the label
  async list({ labelId, state }) {
    if (labelId == undefined || state == undefined) {
      return null;
    }

    try {
      const response = await client.get(
        `${this.URI}?recordlabel=${labelId}&state=${state}`
      );

      const result = this.deserializeResponse(response, RecordDeserializer);

      console.log(response);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createRecord({ labelId, record, audioFile}) {
		 // TODO: first post to create the initial record resource
		 // TODO: second put the 
		 try {
				const response = await client.post(`${this.URI}`, {
					 title: record.title,
					 artist: record.artist,
					 state: 'DRAFT',
					 recordlabel: labelId
				})

				const result = this.deserializeResponse(response, RecordDeserializer);

				const formData = new FormData()
				formData.append('value', audioFile)
				// TODO: finish 
				formData.append('record', result.id)

				const response = await client.put(`${this.URI}/upload`, formData)

				// TODO return response
				return result
		 } catch(err) {
				console.error(error)
				debugger
				return nuull
		 }
  }

	 async
}

export default RecordRepository;
