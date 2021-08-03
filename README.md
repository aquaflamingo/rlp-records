# RLP Records 
> Create and publish an own chain artifact for musical works

Web3 app to mint and manage Ethereum ERC-721 tokens claiming ownership of an audio file's hashed audio fingerprint.

## Design
* [Design](./docs/design.md)

## Build & Run
### IPFS
* TODO

### Blockchain
```bash
# Install deps
yarn 
```

Compile contracts via:
```bash
npx hardhat compile
```

Deploy via:
```bash
# Deploy compiled contracts to the localhost hardhat RPC and write the contract results to webclient folder to access
npx hardhat deploy --network localhost --export webclient/src/contracts/index.json
```

#### Tasks
See `hardhat.config.js`

List accounts:
```bash
npx hardhat --network localhost accounts
```

WIP:

Get record information:
```bash
npx hardhat recordInfo --network localhost --tokenId id 
```

Get owned records:
```bash
npx hardhat records --network localhost --account account
```

### Web Client
```bash
# Go into webclient
cd webclient

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

