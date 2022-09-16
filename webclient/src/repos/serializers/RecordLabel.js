export const RecordLabelDeserializer = (data) => {
  return {
    id: data.id,
    name: data.name,
    // FIXME: convert to recursive deserialization when deserialize response is in iterable module
    members: data.member_set,
  };
};
