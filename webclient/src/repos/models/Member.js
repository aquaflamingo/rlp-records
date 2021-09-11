export const MemberDeserializer = (data) => {
  return {
    type: data.type,
    id: data.id,
    name: data.attributes.name,
  };
};
