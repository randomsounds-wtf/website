import { ethers } from 'ethers'
import { JSONRPC_URL } from './constants'

export const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com', 137)
