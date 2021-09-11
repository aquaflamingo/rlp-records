import client from "./ApiClient";
import Base from "./Base";
import { MemberDeserializer } from "./models/Member.js";

// RecordLabelRepository is the data access interface  for labels
class MemberRepository extends Base {
  constructor() {
    super();
    this.URI = "/members/";
  }

  async list({ labelId }) {
    try {
      const response = await client.get(`${this.URI}?recordlabel=${labelId}`);

      const result = this.deserializeResponse(response, MemberDeserializer);

      console.log(response);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default MemberRepository;
