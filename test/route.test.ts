import { Token, WICY, ChainId, Pair, TokenAmount, Route, CICY } from '../src'

describe('Route', () => {
  const token0 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')
  const wicy = WICY[ChainId.ICE_MAINNET]
  const pair_0_1 = new Pair(new TokenAmount(token0, '100'), new TokenAmount(token1, '200'), ChainId.ICE_MAINNET)
  const pair_0_wicy = new Pair(new TokenAmount(token0, '100'), new TokenAmount(wicy, '100'), ChainId.ICE_MAINNET)
  const pair_1_wicy = new Pair(new TokenAmount(token1, '175'), new TokenAmount(wicy, '100'), ChainId.ICE_MAINNET)

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0)
    expect(route.pairs).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(ChainId.ICE_MAINNET)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_wicy, pair_0_1, pair_1_wicy], wicy)
    expect(route.pairs).toEqual([pair_0_wicy, pair_0_1, pair_1_wicy])
    expect(route.input).toEqual(wicy)
    expect(route.output).toEqual(wicy)
  })

  it('supports ether input', () => {
    const route = new Route([pair_0_wicy], CICY[ChainId.ICE_MAINNET])
    expect(route.pairs).toEqual([pair_0_wicy])
    expect(route.input).toEqual(CICY[ChainId.ICE_MAINNET])
    expect(route.output).toEqual(token0)
  })

  it('supports ether output', () => {
    const route = new Route([pair_0_wicy], token0, CICY[ChainId.ICE_MAINNET])
    expect(route.pairs).toEqual([pair_0_wicy])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(CICY[ChainId.ICE_MAINNET])
  })
})
