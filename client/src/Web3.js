import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

const Web3 = () => {
  const { active, connector } = useWeb3React()
  const [ web3jsInstance, setWeb3jsInstance ] = useState(null)
  const [ account, setAccount ] = useState('')

  useEffect(() => {
    connector?.getProvider().then(provider => {
      // Instantiate web3.js
      const instance = new Web3(provider)
      setWeb3jsInstance(instance)
    })
  }, [active, connector])
  useEffect(() => {
    if (web3jsInstance === null) {
      return
    }
    web3jsInstance.eth.getAccounts((err, accounts: string[]) => {
      if (err) {
        debugger
        console.error(err)
      } else {
        setAccount(accounts[0])
      }
    })
  }, [web3jsInstance])

  return <p>{web3jsInstance ? `${account}` : ':('}</p>
}

export default Web3
