import React, { useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
// @ts-ignore
import { claim, wallet_info, nav } from '../styles/nav.module.css'
import { ExternalLink } from 'react-external-link'

export const Nav = () => {


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
      </div>
    </nav>
  )
}
