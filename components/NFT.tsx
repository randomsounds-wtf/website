import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { NFTType } from '../lib/types'
import { wrapUrl } from '../lib/wrapUrl'

export const NFT = ({ name, image, audio_url }: NFTType) => {
  const ref = useRef<HTMLAudioElement>()

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = 0.5
    }
  }, [])

  return (
    <div>
      <style jsx>
        {`
          img {
            user-select: none;
            pointer-events: none;
          }

          audio {
            width: 100%;
          }
        `}
      </style>

      <Image
        layout="intrinsic"
        loading="lazy"
        draggable="false"
        height={1000}
        width={1000}
        unoptimized={true}
        src={wrapUrl(image)}
        alt={name}
      />
      {/* @ts-ignore */}
      <audio ref={ref} controls src={wrapUrl(audio_url)} />
    </div>
  )
}
