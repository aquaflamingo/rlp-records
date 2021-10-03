import client from "./ApiClient";
import Base from "./Base";
import { ERC721sDeserializer } from "./models/ERC721.js";

// ERC721Repository is the data access interface  for labels
class ERC721Repository extends Base {
  constructor() {
    super();
    this.URI = "/erc721s/";
  }

async create({tokenValues}) {
    try {
      let response = await client.post(`${this.URI}`, {
        tokenId: tokenValues.tokenId,
        metadataURI: tokenValues.metadatURI,
        record: tokenValues.recordId,
      });
    } catch (err) {
      console.error(err);
      debugger;
      return null;
    }
	 }
}

export default ERC721Repository;
