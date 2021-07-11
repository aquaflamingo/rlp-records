
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers'
//
// TODO ENV
const infuraProjectId = '95202223388e49f48b423ea50a70e336';


const getLibrary = (provider) => {
  const lib = new EthersWeb3Provider(provider)
  lib.pollingInterval = 1000
  return lib
}

const Web3Provider = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  )
}

export default Web3Provider;
