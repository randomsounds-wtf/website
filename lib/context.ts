import { createContext, useContext } from 'react'
import { WalletProps } from './types'

export const WalletContext = createContext<WalletProps>(null as any)

export const useWallet = () => {
  const inst = useContext(WalletContext)

  return inst
}
