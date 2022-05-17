import { Token, WICZ, ChainId, Pair, TokenAmount, Route, CICZ } from '../src'

describe('Route', () => {
  const token0 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')
  const wicz = WICZ[ChainId.ICE_MAINNET]
  const pair_0_1 = new Pair(new TokenAmount(token0, '100'), new TokenAmount(token1, '200'), ChainId.ICE_MAINNET)
  const pair_0_wicz = new Pair(new TokenAmount(token0, '100'), new TokenAmount(wicz, '100'), ChainId.ICE_MAINNET)
  const pair_1_wicz = new Pair(new TokenAmount(token1, '175'), new TokenAmount(wicz, '100'), ChainId.ICE_MAINNET)

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0)
    expect(route.pairs).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(ChainId.ICE_MAINNET)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_wicz, pair_0_1, pair_1_wicz], wicz)
    expect(route.pairs).toEqual([pair_0_wicz, pair_0_1, pair_1_wicz])
    expect(route.input).toEqual(wicz)
    expect(route.output).toEqual(wicz)
  })

  it('supports ether input', () => {
    const route = new Route([pair_0_wicz], CICZ[ChainId.ICE_MAINNET])
    expect(route.pairs).toEqual([pair_0_wicz])
    expect(route.input).toEqual(CICZ[ChainId.ICE_MAINNET])
    expect(route.output).toEqual(token0)
  })

  it('supports ether output', () => {
    const route = new Route([pair_0_wicz], token0, CICZ[ChainId.ICE_MAINNET])
    expect(route.pairs).toEqual([pair_0_wicz])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(CICZ[ChainId.ICE_MAINNET])
  })
})
