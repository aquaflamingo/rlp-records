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
```
npx hardhat compile
```

Deploy via:
```
npx hardhat run scripts/deploy.js --network localhost
```

#### Tasks
See `hardhat.config.js`

List accounts:
```bash
npx hardhat accounts
```

Get record information:
```bash
npx hardhat recordInfo --tokenId id 
```

Get owned records:
```bash
npx hardhat records --account account
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
	 * This is so that you can interact with the RLP contract which is `Ownable` by the deployer via Hardhat (e.g. `ethers.getSigners(0)`)

