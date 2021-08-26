import { RLP_RECORDS, REC_HASH_RATE} from "../models/Fixture";

const MOCK_DATA_STORE = {
  [RLP_RECORDS.id]: [REC_HASH_RATE],
};

// RecordRepository is the data access interface for record
class RecordRepository {
  constructor() {
    // Setup default records
    this.records = MOCK_DATA_STORE;
    console.log("RecordRepository: ", this.records);
  }

  // Returns all records associated with the label
  listRecords(labelId) {
    const records = this.findRecords(labelId);

    return new Promise((resolve, reject) => {
      resolve(records);
    });
  }

  createRecord({ labelId, record }) {
    console.log(
      "RecordRepository: creating new record, label: ",
      labelId,
      " record: ",
      record
    );

    const rec = {
      id: Math.floor(Math.random() * 100000000),
      state: "DRAFT",
      labelId: labelId,
      title: record.title,
      artist: record.artist,
    }

    // TODO fingerprint
    this.records[labelId].push(rec);

    return new Promise((resolve, reject) => {
      resolve({ data: { msg: "done" } });
    });
  }

  // FIXME - temporary
  findRecords(labelId) {
    // Use default
    return this.records[labelId];
  }
}

export default RecordRepository;
