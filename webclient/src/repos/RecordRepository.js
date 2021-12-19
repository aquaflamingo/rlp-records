import client from "./ApiClient";
import Base from "./Base";

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
      console.log("RecordRepository.list:", response);

      let result = [];

      if (response && response.data) {
        result = response.data
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

	 async getRecordMetadata({recordId}) {
    if (recordId == undefined) {
      return null;
    }

    try {
      const response = await client.get(
        `${this.URI}${recordId}/metadata/`
      );

      console.log("RecordRepository.getRecordMetadata:", response);

      let result = {};

      if (response && response.data) {
        result = response.data
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }

	 }

  async createRecord({ labelId, recordValues, audioFile }) {
    try {
			 // First we need to create the record entry in the backend
			 // containing all the values and data for the artist
      let response = await client.post(`${this.URI}`, {
        title: recordValues.title,
        artist: recordValues.artist,
        state: "DRAFT",
        recordlabel: labelId,
      });

			 // Once the record is created, we want to uploaded
			 // the associated audio and link them on the backend.
			 // During this process, we will fingerprint the audiofile
			 // and return a hash in response.
      const record = response.data;

			 // Submit via form
      const formData = new FormData();
      formData.append("record", record.id);
      formData.append("file", audioFile);

      response = await client.put(`${this.URI}${record.id}/upload/`, formData);

			 // The backend returns a fingerprint hash integer value 
			 // that represents the identified chromaprint for the audiofile.
			 const upload = response.data

			 // Return the record and the resulting fingerprint hash value
      return {
				 record,
				 metadata: {
						...upload
				 }
			}
    } catch (err) {
      console.error(err);
      debugger;
      return null;
    }
  }
}

export default RecordRepository;
