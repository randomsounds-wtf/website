import { NFT } from '../components/NFT'
import { ownerAddress } from '../lib/constants'
import { Box3D } from '../components/Box3D'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { provider } from '../lib/jsonRpcProvider'
import { getContract } from '../lib/fetch'
import Draggable from 'react-draggable'
// @ts-ignore
import { index, preview } from '../styles/index.module.css'
import Head from 'next/head'
import { BigNumber } from 'ethers'

const nft = {
  audio_url: 'QmcNVWdGTZb8xj3rHvs7rDq1BxbiB7MKvCGsDtAq6WNrxj',
  name: '#2 // RAND0M-S0UNDS-a727479d944b-4575-a1d3-3e695d3986e2.mp3',
  description:
    '#2 // RAND0M-S0UNDS-a727479d944b-4575-a1d3-3e695d3986e2.mp3 // Limited collection. The audio track for this NFT was created with cgMusic by Maciej Biedrzycki (http://maciej.codeminion.com)',
  image: 'QmSGojxFWU9meXvimmHHjqJbUM2YDciDkF8nMpEWCfN3kR'
}

const Index = () => {
  const [nftsLeft, setNftsLeft] = useState(50)

  useEffect(() => {
    if (provider) {
      const contract = getContract(provider)
      contract.balanceOf(ownerAddress).then((b: BigNumber) => {
        setNftsLeft(b.toNumber())
      })
    }
  }, [provider])

  return (
    <main className={index}>
      <Head>
        <title>RAND0M S0UNDS NFT</title>
      </Head>

      <header>
        <style jsx>
          {`
            div:first-of-type {
              max-width: 100%;
            }
          `}
        </style>
        <div>
          <span id="saleCount">
            NFTs left: {nftsLeft}
          </span>
          <h1>RAND0M S0UNDS</h1>
          <span>
            Randomly generated audio NFTs. <a href="#more">↓ Learn more</a>
          </span>
        </div>

        <div
          className={preview}
          onClick={() => {
            Router.push('/preview/2')
          }}
        >
          <Box3D minHeight={200} minWidth={200} perspective={1000} rotateForce={20}>
            <NFT {...nft} />
          </Box3D>
        </div>
      </header>
      <article id="more">
        <div>
          <h2>WTF is this?</h2>
          <p>
            🎵Random Sounds🎵 is a limited NFT collection of 50 unique audio tracks that were created in a random music
            generator <a href="http://maciej.codeminion.com/2008/05/cgmusic-computers-create-music/">cgMusic</a> that
            allows you to create music from random seed. The program was written by{' '}
            <a href="http://maciej.codeminion.com">Maciej Biedrzycki</a>.
          </p>
          <h2>Why only 50 NFTs?</h2>
          <p>
            cgMusic exports audio to MIDI so it takes some time to export it first, convert, upload to IPFS and the mint
            the NFT. The process is quite pain in the ass.
          </p>
          <h2>Why on Polygon?</h2>
          <p>
            It&quot;s super cheap to deploy. While it costs ~$50-200 to deploy on mainnet on Polygon it costs less than
            a cent.
          </p>
        </div>
        <Draggable>
          <div>
            <Image src="/cgMusic.png" layout="responsive" width={844} height={633} alt="cgMusic" />
          </div>
        </Draggable>
      </article>
    </main>
  )
}

export default Index
