import { ethers } from 'ethers'
import { JSONRPC_URL } from './constants'

export const provider = new ethers.providers.JsonRpcProvider(JSONRPC_URL, process.env.NEXT_PUBLIC_NETWORK_ID)
