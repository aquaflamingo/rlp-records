export const EventDeserializer = (data) => {
  return {
		 proof: data.proof,
		 eventType: data.event_type,
		 details: data.details
  };
};
