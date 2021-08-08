import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { createContext, useContext } from 'react'
import { WalletProps } from './types'

export const WalletContext = createContext<WalletProps>(null as any)

export const useWallet = () => {
  const inst = useContext(WalletContext)

  return inst
}
