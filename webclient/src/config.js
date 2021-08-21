// Using 12 Factor App Methodology
// Inject configurations via environment and hydrate
// in the config object.
const config = {
  IPFS_HTTP_API_URL: process.env.IPFS_HTTP_API_URL || "http://localhost:5001",
	 MONGO_DB_URI: process.env.MONGO_DB_URI || "mongodb://localhost:27017/rlp",
};

export default config;
