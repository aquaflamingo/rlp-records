export const MembersDeserializer = (data) => {
  return {
    id: data.id,
    name: data.name,
    walletAddress: data.wallet_address,
    labelId: data.recordlabel,
  };
};
