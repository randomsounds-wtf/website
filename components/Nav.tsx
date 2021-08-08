import React, { useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { useState } from 'react'
import Link from 'next/link'
import { getContract } from '../lib/fetch'
import { useWallet } from '../lib/context'

import Image from 'next/image'
// @ts-ignore
import { claim, wallet_info, nav } from '../styles/nav.module.css'
import { SwitchNetwork } from './SwitchNetwork'
import { ExternalLink } from 'react-external-link'

const fetchNavInfo = async (provider: ethers.providers.Web3Provider, addr: string) => {
  try {
    const networkId = (await provider.getNetwork()).chainId

    const sameNetwork = networkId === (process.env.NEXT_PUBLIC_NETWORK_ID! as unknown as number)

    if (sameNetwork) {
      const bal = await provider.getBalance(addr)

      const contract = await getContract(provider)

      const nftCount = (await contract.balanceOf(addr)).toNumber()

      return { balance: parseFloat(ethers.utils.formatEther(bal)).toFixed(3), nftCount }
    } else {
      return { balance: '', nftCount: 0 }
    }
  } catch {
    return { balance: '', nftCount: 0 }
  }
}

export const Nav = () => {
  const { provider, address, selectWallet, isWalletSelected, disconnectWallet } = useWallet()

  const [balance, setBalance] = useState('0')
  const [nftCount, setNftCount] = useState(0)

  const refetch = () => {
    fetchNavInfo(provider, address).then(({ balance, nftCount }) => {
      setBalance(balance)
      setNftCount(nftCount)
    })
  }

  useEffect(() => {
    if (provider && address) {
      refetch()
      const interval = setInterval(() => refetch(), 5000)

      return () => clearInterval(interval)
    }
  }, [provider, address, balance])

  return (
    <nav className={nav}>
      <div id="first">
        <Link href="/">
          <a>
            <span role="img" aria-label="home">
              🏠
            </span>
          </a>
        </Link>
        <ExternalLink href="https://github.com/randomsounds-wtf">
          <Image height={16} width={16} src="/github.svg" alt="GitHub" />
        </ExternalLink>
        <ExternalLink href="https://www.reddit.com/r/randomsoundswtf/">
          <Image height={16} width={16} src="/reddit.svg" alt="Reddit" />
        </ExternalLink>

        <Link href="/claim">
          <a className={claim}>Claim NFT</a>
        </Link>
      </div>
      <div className={wallet_info}>
        {balance === '' ? (
          <>
            <span>Wrong network.</span> <SwitchNetwork provider={provider} />
          </>
        ) : (
          <>
            {isWalletSelected && address && (
              <>
                <span>
                  <Image src="/matic.svg" height={16} width={16} alt="MATIC" />
                  <span>{balance}</span>
                </span>{' '}
                <Link href="/gallery">
                  <a>
                    {balance !== '' && <span>{address}</span>}
                    {nftCount ? <span>{nftCount}</span> : undefined}
                  </a>
                </Link>
              </>
            )}
            <button
              onClick={async () => {
                if (isWalletSelected) {
                  disconnectWallet()
                } else await selectWallet()
              }}
            >
              {isWalletSelected ? 'Disconnect' : 'Connect (Polygon)'}
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
