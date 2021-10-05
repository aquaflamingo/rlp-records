import client from "./ApiClient";
import Base from "./Base";
// TODO: create event deserializer
import { EventsDeserializer } from "./models/Event.js";

// EventRepository is the data access interface  for labels
class EventRepository extends Base {
  constructor() {
    super();
    this.URI = "/events/";
  }

	 async createMintEvent({ proof, details}) {
    try {
      let response = await client.post(`/events/`, {
				 event_type: 'MINT',
				 proof: proof,
				 details
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

export default EventRepository;
