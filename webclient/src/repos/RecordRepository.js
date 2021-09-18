import client from "./ApiClient";
import Base from "./Base";
import { RecordsDeserializer } from "./models/Record.js";

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
        result = this.deserializeResponse(response.data, RecordsDeserializer);
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createRecord({ labelId, recordValues, audioFile }) {
    try {
      let response = await client.post(`${this.URI}`, {
        title: recordValues.title,
        artist: recordValues.artist,
        state: "DRAFT",
        recordlabel: labelId,
      });

      const record = response.data;

      const formData = new FormData();
      formData.append("record", record.id);
      formData.append("file", audioFile);

      response = await client.put(`${this.URI}${record.id}/upload/`, formData);

      return record;
    } catch (err) {
      console.error(err);
      debugger;
      return null;
    }
  }

  async;
}

export default RecordRepository;
