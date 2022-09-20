# RLP Records Blockchain Contracts
## Getting Started
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

#### IPFS CORS
You will need to set your local IPFS installation to allow CORS requests

```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```


### Hardhat
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

Alternatively use the `Makefile`

```bash
make blockchain.node
make blockchain.deploy
```

#### Local Development
For local development you can create a file called `hardhatAccounts.json` that is automatically loaded and used to deploy contracts. You will need to configure the local instance with an account according the configuration [spec](https://hardhat.org/hardhat-runner/docs/config#hd-wallet-config).

Ensure that this is the same configuration and mnemonic you used for MetaMask

```
{
  "mnemonic": "TODO",
  "path": "m/44'/60'/0'/0",
  "initialIndex": 0,
  "count": 20,
  "passphrase": "",
  "accountsBalance": "1000000000000000000000"
}
```

> !! Gotcha: make sure that your JSON file is valid JSON otherwise, hardhat will use the default and not tell you there is an error.

#### Tasks
See `hardhat.config.js`

List accounts:
```bash
npx hardhat --network localhost accounts
```

Get record information:
```bash
npx hardhat recordInfo --network localhost --tokenid $id 
```

Get owned records:
```bash
npx hardhat records --network localhost --account $ethAccount
```

