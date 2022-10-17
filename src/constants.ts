import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  ICE_MAINNET = 550,
  ICE_SNOW = 552,
  ICE_ARCTIC = 553
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
    WICZ: '0xDbd5b8C9cF1e13d6eba4Cf05868F9dc20e093FE1',
    CHEF: '0x089FCB09972FCa4578095Fa7C139e6F69ec85102',
    AIRDROP: '0xd2B429f1460C2eE817d42f303A49AF1C19bc1e84',
    MULTICALL: '0x25B52786664D9470F52648CCD2aD9F4E83722862'
  },
  ICE_SNOW: {
    TOKEN: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    FACTORY: '0x83962989A6138fB2D0B542f868b2FB4479379CCa',
    ROUTER: '0x4256D3e5D65DeCC0D1c27C6495FCd84656c08F7B',
    WICZ: '0xDbd5b8C9cF1e13d6eba4Cf05868F9dc20e093FE1',
    CHEF: '0x089FCB09972FCa4578095Fa7C139e6F69ec85102',
    AIRDROP: '0xd2B429f1460C2eE817d42f303A49AF1C19bc1e84',
    MULTICALL: '0x25B52786664D9470F52648CCD2aD9F4E83722862'
  },
  ICE_ARCTIC: {
    TOKEN: '0xCf3cd1A322fA7397588a48e6bC0eB2cDe56fe783',
    FACTORY: '0x720E42229a3552648B2AB5C01DbEadEfEC0f7bcb',
    ROUTER: '0x260Ed18B4c96Ef72551F28Ca086fc99a11331f76',
    WICZ: '0xd92FB2844E76e455DfD0e20D46BCA2Cc77558B6e',
    CHEF: '0x6A21eE0519a3614161A60CD59887A9392b8b9FC1',
    AIRDROP: '0x6e4D6C1c10DEBD2f938B6375dC28C4158b3c47fD',
    MULTICALL: '0x3c68c784B94040d49C0b935ddfAedC36b8Dc8526'
  }
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.ICE_MAINNET]: contractAddresses.ICE_MAINNET.FACTORY,
  [ChainId.ICE_SNOW]: contractAddresses.ICE_SNOW.FACTORY,
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
