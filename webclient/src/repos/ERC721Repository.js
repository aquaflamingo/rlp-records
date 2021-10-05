import client from "./ApiClient";
import Base from "./Base";
import { ERC721sDeserializer } from "./models/ERC721.js";

// ERC721Repository is the data access interface  for labels
class ERC721Repository extends Base {
  constructor() {
    super();
    this.URI = "/erc721s/";
  }

	 async createMintEvent({ txHash, recordId, tokenId, metadataURI }) {
    try {
      let response = await client.post(`/events/`, {
				 event_type: 'MINT',
				 data: {
						proof: txHash,
						record_id: recordId,
						token_id: tokenId,
						metadata_uri: metadataURI
				 }
			})

      const res = response.data;

      return res;
    } catch (err) {
      console.error(err);
      debugger;
      return null;
    }
	 }
}

export default ERC721Repository;
