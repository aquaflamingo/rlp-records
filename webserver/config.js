// Using 12 Factor App Methodology
// Inject configurations via environment and hydrate
// in the config object.
const config = {
	 MONGO_DB_URI: process.env.MONGO_DB_URI || "mongodb://localhost:27017/rlp"
	 PORT: process.eng.PORT || 5000
};

export default config;
