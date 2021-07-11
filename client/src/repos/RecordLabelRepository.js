import { RLP_RECORDS, RecordLabel } from "../model/RecordLabel";

// RecordLabelRepository is the data access interface  for labels
class RecordLabelRepository {
  listMembers(id) {
    const label = this.findLabel(id);
    return new Promise((resolve, reject) => {
      resolve(label.members);
    });
  }

  // FIXME - use other record labels
  findLabel(_id) {
    return RLP_RECORDS;
  }
}

export default RecordLabelRepository;
