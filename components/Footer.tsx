import Image from 'next/image'
import React from 'react'
import { ExternalLink } from 'react-external-link'

export const Footer = () => (
  <footer>
    <span>
      {' '}
      by <ExternalLink href="https://v1rtl.site">v1rtl</ExternalLink>
    </span>
    <span>
      powered by{' '}
      <ExternalLink href="https://polygon.technology/">
        <Image src="/polygon.svg" alt="Polygon" height={18} width={82} />
      </ExternalLink>
    </span>
  </footer>
)
