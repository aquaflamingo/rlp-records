// Using 12 Factor App Methodology
// Inject configurations via environment and hydrate
// in the config object.
const config = {
  IPFS_HTTP_API_URL: process.env.IPFS_HTTP_API_URL || "http://localhost:5001",
  API_URL: process.env.API_URL || "http://localhost:8000",
};

export default config;
