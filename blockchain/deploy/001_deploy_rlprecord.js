module.exports = async (hre) => {
	 const {deployments, getNamedAccounts} = hre;
	 const {deploy} = deployments;

	 const {deployer, tokenOwner} = await getNamedAccounts();

	 await deploy('RLPRecord', {
			// Deployer is owner (for now)
			from: deployer,
			args: ["RLPRecord", "RLP"],
			log: true
	 });
};

module.exports.tags = ['RLPRecord'];

