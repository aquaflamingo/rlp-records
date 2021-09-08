import client from "./ApiClient"

// RecordRepository is the data access interface for record
class RecordRepository {
	 constructor() {
			this.URI = "/records/"
	 }

	 // Returns all records associated with the label
	 async listRecords({labelId, state}) {
			try {
				 const response = await client.get(`${this.URI}?recordlabel=${labelId}&state=${state}`)

				 // TODO map to object
				 return response.data
				 console.log(response);
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
