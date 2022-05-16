import { ChainId, Token, Pair, TokenAmount, WICY, Price } from '../src'

describe('Pair', () => {

  const DAS = new Token(ChainId.ICE_ARCTIC, '0x7dA7F13653436345756D93c45A09066bf664FbB3', 18, 'DAS', 'Das Coin');
  const CON = new Token(ChainId.ICE_ARCTIC, '0x75aF0F9CD8831050812706B81316127D30271DCf', 18, 'CON', 'Connor Coin');

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(DAS, '100'), new TokenAmount(WICY[ChainId.ICE_MAINNET], '100'), ChainId.ICE_ARCTIC)).toThrow(
        'CHAIN_IDS'
      )
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      //expect(Pair.getAddress(DAS, CON)).toEqual('0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5')
      expect(Pair.getAddress(DAS, CON, ChainId.ICE_MAINNET)).toEqual('0xb7B78BCdFB70957541AcA6f9fC123A31b53896d7')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).token0).toEqual(CON)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).token0).toEqual(CON)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).token1).toEqual(DAS)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).token1).toEqual(DAS)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.ICE_ARCTIC).reserve0).toEqual(
        new TokenAmount(CON, '101')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).reserve0).toEqual(
        new TokenAmount(CON, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.ICE_ARCTIC).reserve1).toEqual(
        new TokenAmount(DAS, '100')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).reserve1).toEqual(
        new TokenAmount(DAS, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).token0Price).toEqual(
        new Price(CON, DAS, '100', '101')
      )
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '101'), ChainId.ICE_ARCTIC).token0Price).toEqual(
        new Price(CON, DAS, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).token1Price).toEqual(
        new Price(DAS, CON, '101', '100')
      )
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '101'), ChainId.ICE_ARCTIC).token1Price).toEqual(
        new Price(DAS, CON, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(DAS, '101'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC)
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(CON)).toEqual(pair.token0Price)
      expect(pair.priceOf(DAS)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WICY[ChainId.ICE_ARCTIC])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '101'), ChainId.ICE_ARCTIC).reserveOf(DAS)).toEqual(
        new TokenAmount(DAS, '100')
      )
      expect(new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).reserveOf(DAS)).toEqual(
        new TokenAmount(DAS, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(CON, '101'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).reserveOf(WICY[ChainId.ICE_ARCTIC])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).chainId).toEqual(ChainId.ICE_ARCTIC)
      expect(new Pair(new TokenAmount(CON, '100'), new TokenAmount(DAS, '100'), ChainId.ICE_ARCTIC).chainId).toEqual(ChainId.ICE_ARCTIC)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).involvesToken(DAS)).toEqual(true)
    expect(new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).involvesToken(CON)).toEqual(true)
    expect(
      new Pair(new TokenAmount(DAS, '100'), new TokenAmount(CON, '100'), ChainId.ICE_ARCTIC).involvesToken(WICY[ChainId.ICE_ARCTIC])
    ).toEqual(false)
  })
})
