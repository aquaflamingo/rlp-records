// TODO: Pull deserializer out to utility module
class Base {
  constructor() {}

  deserializeResponse(data, deserializer) {
    let result = [];

    for (var m = 0; m < data.length; m++) {
      result.push(deserializer(data[m]));
    }
    return result;
  }
}

export default Base;
