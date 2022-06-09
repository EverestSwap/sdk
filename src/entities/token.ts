import invariant from 'tiny-invariant'
import { ChainId, contractAddresses } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId = ChainId.ICE_MAINNET
  public readonly address: string

  public constructor(
    chainId: ChainId = ChainId.ICE_MAINNET,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

// TODO: add mainnet address
export const WICZ = {
  [ChainId.ICE_ARCTIC]: new Token(ChainId.ICE_ARCTIC, contractAddresses.ICE_ARCTIC.WICZ, 18, 'WICZ', 'Wrapped ICZ'),
  [ChainId.ICE_SNOW]: new Token(ChainId.ICE_SNOW, contractAddresses.ICE_SNOW.WICZ, 18, 'WICZ', 'Wrapped ICZ'),
  [ChainId.ICE_MAINNET]: new Token(ChainId.ICE_MAINNET, contractAddresses.ICE_MAINNET.WICZ, 18, 'WICY', 'Wrapped ICY')
}
