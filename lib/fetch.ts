import { wrapUrl } from './wrapUrl'
import { Contract, ethers } from 'ethers'
import { NFTWithID } from './types'
import { contractAddress } from './constants'

const abi = [
  {
    "constant": true,
    "inputs": [
      { "name": "owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "name": "balance", "type": "uint256" }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "tokenId", "type": "uint256" }
    ],
    "name": "ownerOf",
    "outputs": [
      { "name": "owner", "type": "address" }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "from", "type": "address" },
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "tokenId", "type": "uint256" }
    ],
    "name": "getApproved",
    "outputs": [
      { "name": "operator", "type": "address" }
    ],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "from", "type": "address" },
      { "indexed": true, "name": "to", "type": "address" },
      { "indexed": true, "name": "tokenId", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "owner", "type": "address" },
      { "indexed": true, "name": "approved", "type": "address" },
      { "indexed": true, "name": "tokenId", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
    {
    "constant": true,
    "inputs": [
      { "name": "tokenId", "type": "uint256" }
    ],
    "name": "tokenURI",
    "outputs": [
      { "name": "uri", "type": "string" }
    ],
    "type": "function"
  },
]


export const getContract = (provider: ethers.providers.Provider | ethers.Signer) => {
  const contract = new Contract(contractAddress, abi, provider)

  return contract
}

export const fetchNFTs = (URIs: { uri: string; id: ethers.BigNumber }[]): Promise<NFTWithID[]> => {
  const promises = URIs.map(({ uri, id }) =>
    fetch(wrapUrl(uri), { cache: 'force-cache' })
      .then((res) => res.json())
      .then((json) => {
        return { ...json, id }
      })
  )

  return Promise.all(promises)
}

export const etherFetcher = async (
  addr: string,
  provider: ethers.providers.Provider,
  func: string
) => {
  if (provider) {
    const contract = await getContract(provider)

    const result = await (contract as any)[func](addr)

    return result
  }
}
