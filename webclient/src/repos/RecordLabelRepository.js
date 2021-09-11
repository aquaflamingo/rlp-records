import client from "./ApiClient";
import Base from "./Base";

// RecordLabelRepository is the data access interface  for labels
class RecordLabelRepository extends Base {
  constructor() {
    super();
    this.URI = "/recordlabels/";
  }

  // Returns all records associated with the label
  async get(id) {
    if (id == undefined) {
      return null;
    }

    try {
      const response = await client.get(`${this.URI}/${id}/`);

      const result = this.deserializeResponse(
        response,
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
