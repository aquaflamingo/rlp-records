import { useWeb3React } from '@web3-react/core'
import { injected } from './connector'

const Connect = ({ children }) => {
  const { active, activate } = useWeb3React()

  const activateWeb3 = () => {
    activate(injected, undefined, true).catch(err => {
      console.error(err)
      debugger
    })
  }

  return active ?
    <>{children}</> :
    (
      <button type="button" onClick={() => activateWeb3()}>
        Connect
      </button>
    )
}

export default Connect
