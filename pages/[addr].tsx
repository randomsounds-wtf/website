import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { etherFetcher, fetchNFTs, getContract } from '../lib/fetch'
import { NFTType, WalletProps } from '../lib/types'
import { NFT } from '../components/NFT'
import { useRouter } from 'next/router'
import { ethers, providers } from 'ethers'
import { contractAddress, ETH_REGEX, JSONRPC_URL, ownerAddress } from '../lib/constants'
import { useWallet } from '../lib/context'
import useSWR from 'swr'
import { wrapUrl } from '../lib/wrapUrl'
import Head from 'next/head'
import { OGP } from 'react-ogp'

const PersonalGallery = () => {
  const { address, provider } = useWallet()

  const { data: URIs, error } = useSWR<{ uri: string; id: ethers.BigNumber }[]>([address, provider], etherFetcher)

  const [nfts, setNfts] = useState<NFTType[]>([])

  useEffect(() => {
    if (URIs) {
      fetchNFTs(URIs).then((nfts) => setNfts(nfts))
    }
  }, [URIs])

  if (error) {
    return (
      <main>
        <header>
          <h1>Error.</h1>
        </header>
        <p>{error.message}</p>
      </main>
    )
  }

  return (
    <main>
      <header>
        <h1>My NFTs.</h1>
        <p>
          Here is a list of your currenly owned RAND0MS0UNDS NFTs.{' '}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `I bought some RAND0M S0UNDS NFTs, radomly generated audio NFTs. Check out my collection here: ${location.origin}/${address}`
            )}`}
          >
            Tweet about it
          </a>
        </p>
      </header>
      <div id="grid">{nfts[0] ? nfts.map((nft) => <NFT {...nft} key={nft.name} />) : <h2>No NFTs yet :(</h2>}</div>
    </main>
  )
}

const AddressGallery = ({ provider, addr }: { provider: ethers.providers.JsonRpcProvider; addr: string }) => {
  const [nfts, setNfts] = useState<NFTType[]>([])

  const { data: URIs } = useSWR<{ uri: string; id: ethers.BigNumber }[]>([addr, provider], etherFetcher)

  useEffect(() => {
    if (addr && URIs) {
      fetchNFTs(URIs).then((nfts) => setNfts(nfts))
    }
  }, [provider, addr])

  return (
    <main>
      <Head>
        <OGP
          title={`${addr.slice(0, 8)}'s gallery | RAND0M // S0UNDS`}
          description={`All NFTs owned by ${addr.slice(0, 8)}`}
          type="profile"
          // @ts-ignore
          profile={{
            username: addr
          }}
        />
      </Head>
      <header>
        <h1>NFT Gallery</h1>
        <p>
          All NFTs owned by <span>{addr.slice(0, 10)}</span>
        </p>
      </header>
      <div id="grid">{nfts[0] ? nfts.map((nft) => <NFT {...nft} key={nft.name} />) : <h2>No NFTs yet :(</h2>}</div>
    </main>
  )
}

const Gallery = () => {
  let {
    query: { addr },
    ...router
  } = useRouter()

  if (Array.isArray(addr)) addr = addr[0]

  useEffect(() => {
    if (addr && addr !== 'gallery' && !ETH_REGEX.test(addr as string)) {
      router.push('/404')
    }
  }, [])

  if (addr === 'gallery') {
    return <PersonalGallery />
  } else if (addr && ETH_REGEX.test(addr as string)) {
    const provider = new ethers.providers.JsonRpcProvider(JSONRPC_URL)

    return <AddressGallery {...{ provider, addr }} />
  } else {
    return <></>
  }
}

export default Gallery
