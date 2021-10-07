export const MembersDeserializer = (data) => {
  return {
    id: data.id,
    name: data.name,
  };
};
