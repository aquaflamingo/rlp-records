// TODO: Pull deserializer out to utility module
class Base {
  constructor() {}

  deserializeResponse(data, deserializer) {
    let result = [];

    if (data.length) {
      // if data is an array deserialize
      for (var m = 0; m < data.length; m++) {
        result.push(deserializer(data[m]));
      }
      return result;
    } else {
      // deserialize single
      return deserializer(data)
    }
  }
}

export default Base;
