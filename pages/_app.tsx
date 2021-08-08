import React, { useState } from 'react'
import 'typeface-major-mono-display'
import 'typeface-space-mono'
import { AppProps } from 'next/app'
import '../global.css'
import { Nav } from '../components/Nav'
import { useOnboard } from 'use-onboard'
import { WalletContext } from '../lib/context'
import Head from 'next/head'
import { DAPP_ID, HELP_COORDS } from '../lib/constants'
import { Canvas } from '../components/Canvas'
import { Footer } from '../components/Footer'
import { useRouter } from 'next/router'
import { OGP } from 'react-ogp'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const instance = useOnboard({
    options: {
      networkId: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID!, 10),
      networkName: process.env.NEXT_PUBLIC_NETWORK_NAME,
      darkMode: true,
      dappId: DAPP_ID
    }
  })

  return (
    <>
      <Head>
        <OGP
          type="website"
          url="https://randomsounds.wtf"
          title="RAND0M // S0UNDS NFT"
          description="🎵Random Sounds🎵 is a limited NFT collection of 50 unique audio tracks that were created in a random music generator cgMusic that allows you to create music from random seed. The program was written by Maciej Biedrzycki."
          siteName="randomsounds.wtf"
          image="https://randomsounds.wtf/cover.jpg"
        />
        <title>RAND0M S0UNDS NFT</title>
        <link rel="icon" href="/logo.svg" type="image/svg" />
      </Head>
      <Canvas
        cb={(ctx) => {
          if (router.route === '/404' && window.innerWidth >= 1200) {
            HELP_COORDS.map(({ x, y }) => {
              ctx.beginPath()

              ctx.strokeStyle = '#292C36'

              ctx.moveTo(x, y)
              setTimeout(() => {
                ctx.lineTo(x, y)

                ctx.stroke()
              }, 100)
            })
          }
        }}
      />

      <WalletContext.Provider value={instance}>
        <>
          <Nav />
          <Component {...pageProps} />
        </>
      </WalletContext.Provider>

      <Footer />
    </>
  )
}

export default App
