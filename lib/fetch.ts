import { wrapUrl } from './wrapUrl'
import { Contract, ethers } from 'ethers'
import NFTJSON from '@randomsounds/contracts/artifacts/contracts/RandomSoundsNFT.sol/RandomSoundsNFT.json'
import { RandomSoundsNFT } from '@randomsounds/contracts/typechain/RandomSoundsNFT'
import { NFTWithID } from './types'
import { contractAddress } from './constants'

export const getContract = async (provider: ethers.providers.Provider | ethers.Signer) => {
  const contract = new Contract(contractAddress, NFTJSON.abi, provider) as unknown as RandomSoundsNFT

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
  func: keyof RandomSoundsNFT = 'tokenURIsAndIDsByOwner'
) => {
  if (provider) {
    const contract = await getContract(provider)

    const result = await (contract as any)[func](addr)

    return result
  }
}
