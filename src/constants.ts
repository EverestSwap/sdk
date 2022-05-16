import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  ICE_MAINNET = 550,
  ICE_ARCTIC = 552
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// TODO: replace ICE_MAINNET addresses when mainnet releases
export const contractAddresses = {
  ICE_MAINNET: {
    TOKEN: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    FACTORY: '0x83962989A6138fB2D0B542f868b2FB4479379CCa',
    ROUTER: '0x4256D3e5D65DeCC0D1c27C6495FCd84656c08F7B',
    WICY: '0xDbd5b8C9cF1e13d6eba4Cf05868F9dc20e093FE1',
    CHEF: '0x089FCB09972FCa4578095Fa7C139e6F69ec85102',
    AIRDROP: '0xd2B429f1460C2eE817d42f303A49AF1C19bc1e84'
  },
  ICE_ARCTIC: {
    TOKEN: '0x9F9F2Ac260F6332113795e15A6F75Fa628A15E7f',
    FACTORY: '0x4F7693a773b410B9A9696c51E954f6652F86f83d',
    ROUTER: '0x36791F96eCba91f2d10Eef875F1b8AE98671D813',
    WICY: '0xDbd5b8C9cF1e13d6eba4Cf05868F9dc20e093FE1',
    CHEF: '0x58B1947d6ce3Da7439545341eaeb21696B19413C',
    AIRDROP: '0x41f2c07b143572a85Fd9A6D7b9391be1cE242eED'
  }
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ICE_MAINNET]: contractAddresses.ICE_MAINNET.FACTORY,
  [ChainId.ICE_ARCTIC]: contractAddresses.ICE_ARCTIC.FACTORY
}

export const INIT_CODE_HASH = '0xd4cc97f7f1105b7d9084d4771a71f7c9772a5b9546b3736add1f2ebe94995713'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
