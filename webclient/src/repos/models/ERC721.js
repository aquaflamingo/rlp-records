// TODO: this is pretty dumb
export const ERC721sDeserializer = (data) => {
  return {
    tokenId: data.tokenId,
    metadataURI: data.metadataURI,
    recordId: data.record,
  };
};
