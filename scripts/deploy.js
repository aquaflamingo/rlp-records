// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const RLPRecord = await hre.ethers.getContractFactory("RLPRecord");
  const record = await RLPRecord.deploy();

  await record.deployed();

  console.log("rlp record deployed to:", record.address);

	 saveFilesForWebclient(record)
}

// Save contract files to the webclient 
function saveFilesForWebclient(rec) {
  const fs = require("fs");
	 // Must import to src because relative inputs outside source are disabled by webclient
  const contractsDir = __dirname + "/../webclient/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contractAddresses.json",
    JSON.stringify({ RLPRecord: rec.address }, undefined, 2)
  );

  const RLPRecordArtifact = artifacts.readArtifactSync("RLPRecord");

  fs.writeFileSync(
    contractsDir + "/RLPRecord.json",
    JSON.stringify(RLPRecordArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
