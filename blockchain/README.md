# RLP Records 
> Create and publish an own chain artifact for musical works

Web3 app to mint and manage Ethereum ERC-721 tokens claiming ownership of an audio file's hashed audio fingerprint.

## Design
* [Design](./docs/design.md)

## Build & Run
### IPFS
Start IPFS locally in offline mode
```bash
ipfs daemon --offline
```

Alternatively try to use [`local-ipfs`](https://github.com/aquaflamingo/local-ipfs)

Remove all local IPFS content via:
```
# Removes pinned content
ipfs pin ls --type recursive | cut -d' ' -f1 | xargs -n1 ipfs pin rm

# Garbage collect
ipfs repo gc
```

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
npx hardhat deploy --network localhost --export lib/contracts/index.json
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

