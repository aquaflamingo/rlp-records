require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

// ethers.getContract helper
require("hardhat-deploy-ethers");
require("hardhat-deploy");

const hardhatAccounts = require("./hardhatAccounts")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
	 const accounts = await ethers.getSigners();

	 for (const account of accounts) {
			console.log(account.address);
	 }
});

// task("recordInfo", "Prints the URI of a token")
// 	 .addParam("tokenId", "The token id to check for")
// 	 .setAction(async () => {
// 			// First signer is assumed owner 
// 			const owner = await ethers.getSigners(0);
// 			const RLPRecord = await ethers.getContractFactory("RLPRecord");
// 			const rlpRecordContract = new ethers.Contract(RLPRecord, RLPRecord.interface);

// 			// const rlpRecordContract = await ethers.getContract("RLPRecord", owner);

// 			// Get Deployed Instance
// 			await rlpRecordContract.deployed();

// 			const uri = await rlpRecordContract.tokenURI(tokenId)

// 			console.log("URI for ", tokenId, "is ", uri)
// 	 });

task("records", "Prints the list of records for an account")
	 .addParam("account", "The account to check records for")
	 .setAction(async () => {
			// First signer is assumed owner 
			const owner = await ethers.getSigners(0);
			// TODO - cannot find contract RLPRecord
			const rlpRecordContract = await ethers.getContract("RLPRecord");

			// Get Deployed Instance
			await rlpRecordContract.deployed();

			const erc721Count = await rlpRecordContract.balanceOf(account)

			console.log("The account ", account, "has ", erc721Count, " records")

			const erc721s = []

			for (let i = 0; i < erc721Count; i++) {
				 let t = await erc721s.tokenOfOwnerByIndex(account, i)

				 erc721s.push(t)
			}

			console.log(t);
	 });

const HH_NETWORK_ID = 31337

module.exports = {
	 solidity: "0.8.4",
	 networks: {
			hardhat: {
				 accounts: hardhatAccounts.accounts 
			}
	 },
	 namedAccounts: {
			deployer: 0,
			tokenOwner: 0,
	 },
	 paths: {
			sources: 'contracts',
	 },
};

