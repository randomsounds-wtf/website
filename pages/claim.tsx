import React, { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { NFT } from '../components/NFT'
import { ownerAddress } from '../lib/constants'
import { useWallet } from '../lib/context'
import { etherFetcher, fetchNFTs, getContract } from '../lib/fetch'
import { NFTType, NFTWithID, WalletProps } from '../lib/types'
import { provider as jsonRpcProvider } from '../lib/jsonRpcProvider'
import useSWR from 'swr'
import Router from 'next/router'
// @ts-ignore
import { claim_btn } from '../styles/nft_card.module.css'
import Link from 'next/link'
import { Alert } from '../components/Alert'

const ClaimableNFT = ({
  nft,
  isWalletSelected,
  selectWallet,
  provider,
  revalidate
}: { nft: NFTWithID; revalidate: () => Promise<boolean>; isValidating?: boolean } & Pick<
  WalletProps,
  'selectWallet' | 'isWalletSelected' | 'provider'
>) => {
  const [loading, set] = useState(false)
  const [err, setErr] = useState<Error>()

  return (
    <>
      <div key={nft.name}>
        <Link href={`/preview/${nft.id}`}>
          <a>
            <NFT {...nft} />
          </a>
        </Link>
        {err && <Alert error={err} />}
        <button
          className={claim_btn}
          disabled={loading}
          onClick={async () => {
            if (!isWalletSelected) await selectWallet()

            const signer = provider.getSigner()
            const contract = await getContract(signer)

            set(true)

            try {
              const tx = await contract.claim(nft.id, {
                value: ethers.utils.parseEther('120')
              })
              await tx.wait()
              await revalidate()
            } catch (e) {
              setErr(e)
            }
            set(false)
          }}
        >
          {loading ? 'Loading...' : 'Claim'}
        </button>
      </div>
    </>
  )
}

const Claim = () => {
  const { isWalletSelected, provider, selectWallet } = useWallet()

  const {
    data: URIs,
    error,

    revalidate
  } = useSWR<{ uri: string; id: ethers.BigNumber }[]>([ownerAddress, jsonRpcProvider], etherFetcher)

  const [nfts, setNfts] = useState<NFTWithID[]>([])

  useEffect(() => {
    if (URIs) {
      fetchNFTs(URIs).then((nfts) => {
        setNfts(nfts)
      })
    }
  }, [URIs])

  if (error) {
    console.log(error)

    return <Alert error={error} />
  }

  return (
    <div id="grid">
      {nfts?.map((nft) => (
        <ClaimableNFT key={nft.id} {...{ nft, isWalletSelected, selectWallet, provider, revalidate }} />
      ))}
    </div>
  )
}

const ClaimPage = () => {
  return (
    <main>
      <header>
        <h1>Claim NFTs.</h1>
        <p>
          NFTs are already minted with all the metadata. To get one you should just claim it so it gets{' '}
          <a href="https://github.com/randomsounds-wtf/contracts/blob/ffa81a11e6322bf79f554b7b36db0517b47e12b1/contracts/RandomSoundsNFT.sol#L58">
            transferred
          </a>{' '}
          to your wallet.
        </p>
        <p>
          Note that each NFT costs <strong>120 MATIC</strong>.
        </p>
      </header>
      <Claim />
    </main>
  )
}

export default ClaimPage

// export default withEtherSWR({
//   Component: Claim,
//   NoProvider: () => (
//     <main>
//       <p>Select Wallet</p>
//     </main>
//   )
// })
