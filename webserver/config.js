// Using 12 Factor App Methodology
// Inject configurations via environment and hydrate
// in the config object.
// FIXME
const user = "root"
const password = "rootpassword"

const config = {
	 MONGO_DB_URI: process.env.MONGO_DB_URI || `mongodb://${user}:${password}@127.0.0.1:27017/rlp`,
	 PORT: process.env.PORT || 5001
};

export default config;
