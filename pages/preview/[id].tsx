import { GetServerSideProps } from 'next'
import React from 'react'
import { NFT } from '../../components/NFT'
import { getContract } from '../../lib/fetch'
import { provider } from '../../lib/jsonRpcProvider'
import { NFTType, NFTWithID } from '../../lib/types'
import { wrapUrl } from '../../lib/wrapUrl'
// @ts-ignore
import { link_list } from '../../styles/nft_card.module.css'
// @ts-ignore
import { claim, btn } from '../../styles/nav.module.css'
import { Box3D } from '../../components/Box3D'
import { contractAddress, ownerAddress } from '../../lib/constants'
import Head from 'next/head'
import { OGP } from 'react-ogp'
import Image from 'next/image'
import { ExternalLink } from 'react-external-link'
import Link from 'next/link'

type Props = NFTWithID & { description: string; owner: string }

const Preview = ({ id, description, owner, ...nft }: Props) => {
  return (
    <>
      <style jsx global>
        {`
          main {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: calc(100vh - 258px);
            padding: 3rem;
          }
          h1 {
            word-wrap: break-word;
          }
        `}
      </style>
      <Head>
        <title>#{id} | RAND0M S0UNDS</title>
        <OGP
          title={nft.name}
          description={description}
          siteName="RAND0M S0UNDS"
          url={`https://randomsounds.wtf/preview?id=${id}`}
          image={{ url: wrapUrl(nft.image), height: 1000, width: 1000, alt: description }}
        />
      </Head>
      <main>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}
        >
          <Box3D minHeight={200} minWidth={200} perspective={1000} rotateForce={15}>
            <div style={{ width: '600px' }}>
              <NFT {...nft} />
            </div>
          </Box3D>
          <div>
            <h1>{nft.name}</h1>
            <div className={link_list}>
              <ExternalLink href={`https://opensea.io/assets/matic/${contractAddress}/${id}`}>
                <span>OpenSea</span>{' '}
                <Image width={32} height={32} src="/opensea.svg" alt="View on OpenSea" title="View on OpenSea" />
              </ExternalLink>
              <ExternalLink href={`https://polygonscan.com/token/${contractAddress}?a=${id}`}>
                <span>PolygonScan</span>{' '}
                <Image width={32} height={32} src="/matic.svg" alt="View on EtherScan" title="View on EtherScan" />
              </ExternalLink>
            </div>
            <p>{description}</p>

            {owner === ownerAddress ? (
              <Link href="/claim">
                <a
                  style={{
                    width: 'max-content'
                  }}
                  className={`${btn} ${claim}`}
                >
                  Claim
                </a>
              </Link>
            ) : (
              <p>Owner: {owner}</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  const id = params?.id

  if (typeof id === 'string') {
    const c = await getContract(provider)

    const uri = await c.tokenURI(id)

    const owner = await c.ownerOf(id)

    const req = await fetch(wrapUrl(uri), { cache: 'force-cache' })

    console.log(req.url)

    if (req.status !== 200) {
      const text = await req.text()
      console.error(req.status, text)
      return { props: {} }
    } else {
      const json = await req.json()

      return {
        props: { ...json, id, owner }
      }
    }
  } else {
    return { props: {}, notFound: true }
  }
}

export default Preview
