# Web Client
```bash
# Install deps
yarn
```

Start via:
```
yarn start

# Running on localhost:3000
```

* Setup custom MetaMask network:
	 * Name: `hardhat`
	 * RPC: http://127.0.0.1:8545
	 * ChainId: 31337

* Import Hardhat Accounts in `hardhatAccounts.json` into MetaMask
	 * This is so that you can interact with the RLP contract which is `Ownable` by the deployer via Hardhat (e.g. `ethers.getSigners(0)`), see also `namedAccounts`

