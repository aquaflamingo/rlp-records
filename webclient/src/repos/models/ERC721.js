// TODO: this is pretty dumb
export const ERC721sDeserializer = (data) => {
  return {
    tokenId: data.tokenId,
    metadataURI: data.metadataURI,
    record_id: data.record_id,
  };
};
