require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy-ethers");
require("hardhat-deploy");
const hardhatAccounts = require("./hardhatAccounts")

const HH_NETWORK_ID = 31337

task("accounts", "Prints the list of accounts", async () => {
	 const accounts = await ethers.getSigners();

	 for (const account of accounts) {
			console.log(account.address);
	 }
});


task("mintRecord", "Mint a record for an account")
	 .addParam("account", "The account to check records for")
	 .addParam("uri", "The URI to storage record publishing information")
	 .setAction(async ({account, uri}) => {
			const accs = await getNamedAccounts();
			const owner = accs.tokenOwner

			const rlpRecordContract = await ethers.getContract("RLPRecord");
			const tx = await rlpRecordContract.mintToken(account, uri)

			console.log("Minted record ", tx.hash)
	 });

task("records", "Prints the list of records for an account")
	 .addParam("account", "The account to check records for")
	 .setAction(async ({account}) => {
			const accs = await getNamedAccounts();
			const owner = accs.tokenOwner

			const rlpRecordContract = await ethers.getContract("RLPRecord");

			const erc721Count = await rlpRecordContract.balanceOf(account)

			console.log(account, "has", erc721Count.toString(), "RLPRecords.")

			const erc721s = []

			console.log("Iterating through tokens")

			for (let i = 0; i < erc721Count; i++) {
				 console.log("Record", i)

				 let tokenId = await rlpRecordContract.tokenOfOwnerByIndex(account, i)
				 let meta = await rlpRecordContract.tokenURI(tokenId.toString())

				 erc721s.push({ tokenId: tokenId.toString(), meta: meta})
			}

			console.log("Records are", erc721s)
	 });

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
	 }
};

