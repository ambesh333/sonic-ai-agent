import { 
    createConfig, 
    http, 
    cookieStorage, 
    createStorage 
  } from 'wagmi'
  import { mainnet, sepolia} from 'wagmi/chains'
  import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
  import { defineChain } from 'viem'

  export const blazeSonicTestnet = defineChain({
    id: 57054,
    name: 'Blaze Sonic Open Testnet',
    network: 'sonic-testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Sonic',
      symbol: 'S',
    },
    rpcUrls: {
      default: { http: ['https://rpc.blaze.soniclabs.com'] },
    },
    blockExplorers: {
      default: {
        name: 'Blaze Sonic Testnet Explorer',
        url: 'https://testnet.sonicscan.org',
      },
    },
    testnet: true,
  })
  
  export function getConfig() {
    return createConfig({
      chains: [blazeSonicTestnet], 
      connectors: [
        injected(),
        metaMask(),
        safe(),
      ],
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
      transports: {
        [blazeSonicTestnet.id]: http()
      },
    })
  }
  
