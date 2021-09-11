import client from "./ApiClient"
import {RecordDeserializer} from "./models/Record.js"
import { deserializeResponse } from "./helpers.js"

// RecordRepository is the data access interface for record
class RecordRepository {
	 constructor() {
			this.URI = "/records/"
	 }

	 // Returns all records associated with the label
	 async listRecords({labelId, state}) {
			if (labelId == undefined || state == undefined) {
				 return null
			}

			try {
				 const response = await client.get(`${this.URI}?recordlabel=${labelId}&state=${state}`)

				 const result = deserializeResponse(response, RecordDeserializer)

				 console.log(response);
				 return result
			} catch (error) {
				 console.error(error);
				 return null
			}
	 }

	 createRecord({ labelId, record }) {
			console.log(
				 "RecordRepository: creating new record, label: ",
				 labelId,
				 " record: ",
				 record
			);

			const rec = {
				 id: Math.floor(Math.random() * 100000000),
				 state: "DRAFT",
				 labelId: labelId,
				 title: record.title,
				 artist: record.artist,
			}

			// TODO fingerprint
			this.records[labelId].push(rec);

			return new Promise((resolve, reject) => {
				 resolve({ data: { msg: "done" } });
			});
	 }
}

export default RecordRepository;
