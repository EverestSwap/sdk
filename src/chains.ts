import { contractAddresses } from './constants'

interface StakingContract {
  address: string
  active: boolean
  reward_token: string
}

export interface Chain {
  id: string
  name: string
  chain_id: number
  mainnet: boolean
  dex_is_live: boolean
  tracked_by_debank: boolean
  supported_by_gelato: boolean
  rpc_uri: string
  symbol: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls?: string[]
  token_symbol?: string
  logo?: string
  coingecko_id?: string
  debank_everest_id?: string
  contracts?: {
    token: string
    factory: string
    router: string
    wrapped_native_token: string
    local_multisig?: string
    community_treasury?: string
    treasury_vester?: string
    mini_chef?: string
    timelock?: string
    migrator?: string
    airdrop?: string
    foundation_multisig?: string
    joint_multisig?: string
    revenue_distributor?: string
    governor?: string
    fee_collector?: string
    staking?: StakingContract[]
  }
}

export const ETHEREUM_MAINNET: Chain = {
  id: 'ethereum_mainnet',
  chain_id: 1,
  name: 'Ethereum',
  symbol: 'ETH',
  mainnet: true,
  logo: 'https://raw.githubusercontent.com/Staky-io/EverestSwap-sdk/master/src/images/chains/eth.png',
  dex_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  coingecko_id: 'ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://etherscan.io']
}

// TODO: add RPC and explorer uri when mainnet is live
export const ICE_MAINNET: Chain = {
  id: 'ice_mainnet',
  chain_id: 550,
  name: 'ICE Network',
  symbol: 'ICY',
  token_symbol: 'EVRS',
  mainnet: true,
  dex_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: '',
  contracts: {
    token: contractAddresses.ICE_MAINNET.TOKEN,
    factory: contractAddresses.ICE_MAINNET.FACTORY,
    router: contractAddresses.ICE_MAINNET.ROUTER,
    wrapped_native_token: contractAddresses.ICE_MAINNET.WICY
  },
  nativeCurrency: {
    name: 'ICY',
    symbol: 'ICY',
    decimals: 18
  },
  blockExplorerUrls: []
}

export const ICE_ARCTIC: Chain = {
  id: 'ice_arctic',
  chain_id: 552,
  name: 'Arctic Testnet',
  symbol: 'ICY',
  token_symbol: 'EVRS',
  mainnet: false,
  dex_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://arctic-rpc.icenetwork.io:9933',
  contracts: {
    token: contractAddresses.ICE_ARCTIC.TOKEN,
    factory: contractAddresses.ICE_ARCTIC.FACTORY,
    router: contractAddresses.ICE_ARCTIC.ROUTER,
    wrapped_native_token: contractAddresses.ICE_ARCTIC.WICY
  },
  nativeCurrency: {
    name: 'ICY',
    symbol: 'ICY',
    decimals: 18
  },
  blockExplorerUrls: ['https://arctic-blockscout.icenetwork.io']
}

export const CHAINS: Chain[] = [ETHEREUM_MAINNET, ICE_MAINNET, ICE_ARCTIC]
