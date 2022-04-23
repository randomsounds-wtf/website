import React from 'react'
import { ethers } from 'ethers'

export const SwitchNetwork = ({ provider }: { provider: ethers.providers.Web3Provider }) => (
  <button
    style={{
      padding: '1rem 2rem',
      cursor: 'pointer'
    }}
    onClick={() =>
      provider
        .send('wallet_addEthereumChain', [
          {
            chainId: ethers.utils.hexlify(process.env.NEXT_PUBLIC_NETWORK_ID!),
            chainName: 'Polygon network',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
            blockExplorerUrls: ['https://polygonscan.com/']
          }
        ])
        .then(() => location.reload())
    }
  >
    Switch to Polygon
  </button>
)
