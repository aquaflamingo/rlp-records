import client from "./ApiClient";
import Base from "./Base";
import { MembersDeserializer } from "./serializers/Member.js";

// MemberRepository is the data access interface  for labels
class MemberRepository extends Base {
  constructor() {
    super();
    this.URI = "/members/";
  }
  async getFromWallet({ walletAddress }) {
    if (walletAddress == undefined || walletAddress == "") {
      return null;
    }

    try {
      const response = await client.get(
        `${this.URI}?wallet_address=${walletAddress}`
      );
      console.log("MemberRepository.get:", response);

      var result = [];

      if (response && response.data) {
        result = this.deserializeResponse(response.data, MembersDeserializer);
      }

      // Return the first user in the response
      return result[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createMember({ labelId, name, walletAddress }) {
    try {
      let response = await client.post(`${this.URI}`, {
        name: name,
        recordlabel_id: labelId,
        wallet_address: walletAddress,
      });

      var result;

      if (response && response.data) {
        result = this.deserializeResponse(response.data, MembersDeserializer);
      }

      return result;
    } catch (err) {
      console.error(err);
      debugger;
      throw err;
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
