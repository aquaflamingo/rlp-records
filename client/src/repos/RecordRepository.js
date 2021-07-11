import { REC_HASH_RATE } from "../model/Record";

// RecordRepository is the data access interface for record
class RecordRepository {
  // Returns all records associated with the label
  listRecords(labelId) {
    const records = this.findRecords(labelId);

    return new Promise((resolve, reject) => {
      resolve(records);
    });
  }

  // FIXME - temporary
  findRecords(_labelId) {
    return [REC_HASH_RATE];
  }
}

export default RecordRepository;
