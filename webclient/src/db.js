import "mongoose" from "mongoose"
import { MONGO_DB_URI } from "./config.js"

mongoose.connect(MONGO_DB_URI, 
	 {
			useNewUrlParser: true, 
			useUnifiedTopology: true
	 });


const db = db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	 console.log("MongoDB connected")
});

export default db;

