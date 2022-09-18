export const RecordsDeserializer = (data) => {
  return {
    id: data.id,
    artist: data.artist,
    title: data.title,
    state: data.state,
    recordlabel: data.recordlabel,
  };
};
