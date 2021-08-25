import mongoose from "mongoose"
import config from "./config.js"

// TODO
export async function connect() {
	 console.log("What is mongo uri", config)

	 await mongoose.connect(config.MONGO_DB_URI, 
			{
				 useNewUrlParser: true, 
				 useUnifiedTopology: true
			}, ()=>{});

	 const db = mongoose.connection

	 db.on('error', console.error.bind(console, 'connection error:'));

	 db.once('open', function() {
			console.log("MongoDB connected")
	 });

	 return db;
}

