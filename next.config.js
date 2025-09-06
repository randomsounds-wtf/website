const selectEnv = () => {
  const network = process.env.NEXT_PUBLIC_NETWORK

  console.log(`\n\n\n     Using ${network || 'local net'}\n\n\n`)

    return {
      NEXT_PUBLIC_CONTRACT_ADDRESS: '0xF66770253dfC078d6a3844e0c4738d2ff5006E5D',
      NEXT_PUBLIC_JSONRPC_URL: 'https://polygon-mainnet.infura.io/v3/08791951999a4e71b9ba5ae174126de5',
      NEXT_PUBLIC_OWNER_ADDRESS: '0x0A9f12d325b905907C43566b4740F2dFE10C3C4B',
      NEXT_PUBLIC_NETWORK_ID: 137,
      NEXT_PUBLIC_NETWORK_NAME: 'Polygon'
    }
}
/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  env: selectEnv(),
}
