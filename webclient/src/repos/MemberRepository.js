import client from "./ApiClient";
import Base from "./Base";
import { MembersDeserializer } from "./models/Member.js";

// MemberRepository is the data access interface  for labels
class MemberRepository extends Base {
  constructor() {
    super();
    this.URI = "/members/";
  }
  async getFromWallet({ walletAddress }) {
    try {
      const response = await client.get(`${this.URI}?wallet_address=${labelId}`);
      console.log("MemberRepository.list:", response);

      var result;

      if (response && response.data) {
        result = this.deserializeResponse(response.data, MembersDeserializer);
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async list({ labelId }) {
    try {
      const response = await client.get(`${this.URI}?recordlabel=${labelId}`);
      console.log("MemberRepository.list:", response);

      let result = [];

      if (response && response.data) {
        result = this.deserializeResponse(response.data, MembersDeserializer);
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default MemberRepository;
