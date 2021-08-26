import { RLP_RECORDS  } from "../models/Fixture";

const MOCK_DATA_STORE = {
  [RLP_RECORDS.id]: [RLP_RECORDS],
};

// RecordLabelRepository is the data access interface  for labels
class RecordLabelRepository {
  constructor() {
    // Setup default records
    this.labels = MOCK_DATA_STORE;
    console.log("RecordLabelRepository: ", this.records);
  }

  listMembers(id) {
    const label = this.findLabel(id);
    return new Promise((resolve, reject) => {
      resolve(label.members);
    });
  }

  // FIXME - use other record labels
  findLabel(id) {
    return MOCK_DATA_STORE[id];
  }
}

export default RecordLabelRepository;
