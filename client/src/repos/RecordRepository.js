import { Record,RECORD_STATES, REC_HASH_RATE } from "../model/Record";
import { RLP_RECORDS } from "../model/RecordLabel";

// RecordRepository is the data access interface for record
class RecordRepository {
	 constructor() {
			// Setup default records
			this.records = {
				 [RLP_RECORDS.id]: [REC_HASH_RATE]
			}

			console.log("RecordRepository: ", this.records)
	 }

  // Returns all records associated with the label
  listRecords(labelId) {
    const records = this.findRecords(labelId);

    return new Promise((resolve, reject) => {
      resolve(records);
    });
  }

	 createRecord({ labelId, record }) {
			console.log("RecordRepository: creating new record, label: ", labelId, " record: ", record)

			const rec = Record({
				 state: RECORD_STATES.DRAFT,
				 labelId: labelId,
				 title: record.title,
				 artist: record.artist
			})

			// TODO fingerprint
			 this.records[labelId].push(rec)

    return new Promise((resolve, reject) => {

			 resolve({data: {msg: "done"}});
    });
	 }

  // FIXME - temporary
  findRecords(labelId) {
		 // Use default
    return this.records[labelId];
  }
}

export default RecordRepository;
