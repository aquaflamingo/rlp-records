import client from "./ApiClient";
import Base from "./Base";
import { RecordLabelDeserializer } from "./serializers/RecordLabel";

// RecordLabelRepository is the data access interface  for labels
class RecordLabelRepository extends Base {
  constructor() {
    super();
    this.URI = "/recordlabels/";
  }

  // Fetches a list of all available record labelsa
  async list() {
    try {
      const response = await client.get(
        `${this.URI}`
      );

      console.log("RecordLabelRepository.list:", response);

      let result = [];

      if (response && response.data) {
        result = this.deserializeResponse(
          response.data,
          RecordLabelDeserializer
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // Returns all records associated with the label
  async get(id) {
    if (id == undefined) {
      return null;
    }

    try {
      const response = await client.get(`${this.URI}/${id}/`);

      const result = this.deserializeResponse(
        response.data,
        RecordLabelDeserializer
      );

      console.log(response);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default RecordLabelRepository;
