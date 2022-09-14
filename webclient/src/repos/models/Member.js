export const MembersDeserializer = (data) => {
  return {
    id: data.id,
    name: data.name,
    wallet_address: data.wallet_address,
  };
};
