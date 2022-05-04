const selectEnv = () => {
  const network = process.env.NEXT_PUBLIC_NETWORK

  console.log(`\n\n\n     Using ${network || 'local net'}\n\n\n`)

  if (network === 'ropsten') {
    return {
      NEXT_PUBLIC_CONTRACT_ADDRESS: '0x706Ceab8aD7696C75554446Cad371aa337405B09',
      NEXT_PUBLIC_JSONRPC_URL: 'https://ropsten.infura.io/v3/08791951999a4e71b9ba5ae174126de5',
      NEXT_PUBLIC_OWNER_ADDRESS: '0x6E62591248E44690893d138796FAD43D353ABfc7',
      NEXT_PUBLIC_NETWORK_ID: 3,
      NEXT_PUBLIC_NETWORK_NAME: 'Ropsten'
    }
  } else if (network === 'polygon') {
    return {
      NEXT_PUBLIC_CONTRACT_ADDRESS: '0xF66770253dfC078d6a3844e0c4738d2ff5006E5D',
      NEXT_PUBLIC_JSONRPC_URL: 'https://polygon-mainnet.infura.io/v3/08791951999a4e71b9ba5ae174126de5',
      NEXT_PUBLIC_OWNER_ADDRESS: '0x0A9f12d325b905907C43566b4740F2dFE10C3C4B',
      NEXT_PUBLIC_NETWORK_ID: 137,
      NEXT_PUBLIC_NETWORK_NAME: 'Polygon'
    }
  } else {
    return {
      NEXT_PUBLIC_OWNER_ADDRESS: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      NEXT_PUBLIC_JSONRPC_URL: 'http://127.0.0.1:8545',
      NEXT_PUBLIC_CONTRACT_ADDRESS: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    }
  }
}

module.exports = {
  images: {
    domains: ['ipfs.randomsounds.wtf']
  },
  env: selectEnv()
}
