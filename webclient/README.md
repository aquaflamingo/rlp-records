# RLP Records Web Client
## Getting started
Install dependencies via yarn.

```bash
yarn
```

Start via:

```
yarn start

# Running on localhost:3000
```

Ensure you have Metamask or similar blockchain developer tooling installed.

### Networks
- Setup custom MetaMask network:
  - Name: `hardhat`
  - RPC: http://127.0.0.1:8545
  - ChainId: 31337

- Import Hardhat Accounts in `hardhatAccounts.json` into MetaMask (specifically the mnemonic)
  - This is so that you can interact with the RLP contract which is `Ownable` by the deployer via Hardhat (e.g. `ethers.getSigners(0)`), see also `namedAccounts`


