import invariant from 'tiny-invariant'
import { ChainId, CurrencyAmount, CICY, Pair, Percent, Route, Router, Token, TokenAmount, Trade, WICY } from '../src'
import JSBI from 'jsbi'

function checkDeadline(deadline: string[] | string): void {
  expect(typeof deadline).toBe('string')
  invariant(typeof deadline === 'string')
  // less than 5 seconds on the deadline
  expect(new Date().getTime() / 1000 - parseInt(deadline)).toBeLessThanOrEqual(5)
}

describe('Router', () => {
  const token0 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.ICE_MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')

  const pair_0_1 = new Pair(new TokenAmount(token0, JSBI.BigInt(1000)), new TokenAmount(token1, JSBI.BigInt(1000)), ChainId.ICE_MAINNET)

  const pair_weth_0 = new Pair(new TokenAmount(WICY[ChainId.ICE_MAINNET], '1000'), new TokenAmount(token0, '1000'), ChainId.ICE_MAINNET)

  describe('#swapCallParameters', () => {
    describe('exact in', () => {
      it('ether to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_weth_0, pair_0_1], CICY[ChainId.ICE_MAINNET], token1), CurrencyAmount.ether(JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapExactICYForTokens')
        expect(result.args.slice(0, -1)).toEqual([
          '0x51',
          [WICY[ChainId.ICE_MAINNET].address, token0.address, token1.address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x64')
        checkDeadline(result.args[result.args.length - 1])
      })

      it('deadline specified', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_weth_0, pair_0_1], CICY[ChainId.ICE_MAINNET], token1), CurrencyAmount.ether(JSBI.BigInt(100))),
          {
            deadline: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          }
        )
        expect(result.methodName).toEqual('swapExactICYForTokens')
        expect(result.args).toEqual([
          '0x51',
          [WICY[ChainId.ICE_MAINNET].address, token0.address, token1.address],
          '0x0000000000000000000000000000000000000004',
          '0x32'
        ])
        expect(result.value).toEqual('0x64')
      })

      it('token1 to ether', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_0_1, pair_weth_0], token1, CICY[ChainId.ICE_MAINNET]), new TokenAmount(token1, JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapExactTokensForICY')
        expect(result.args.slice(0, -1)).toEqual([
          '0x64',
          '0x51',
          [token1.address, token0.address, WICY[ChainId.ICE_MAINNET].address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
      it('token0 to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_0_1], token0, token1), new TokenAmount(token0, JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapExactTokensForTokens')
        expect(result.args.slice(0, -1)).toEqual([
          '0x64',
          '0x59',
          [token0.address, token1.address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
    })
    describe('exact out', () => {
      it('ether to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactOut(new Route([pair_weth_0, pair_0_1], CICY[ChainId.ICE_MAINNET], token1), new TokenAmount(token1, JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapICYForExactTokens')
        expect(result.args.slice(0, -1)).toEqual([
          '0x64',
          [WICY[ChainId.ICE_MAINNET].address, token0.address, token1.address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x80')
        checkDeadline(result.args[result.args.length - 1])
      })
      it('token1 to ether', () => {
        const result = Router.swapCallParameters(
          Trade.exactOut(new Route([pair_0_1, pair_weth_0], token1, CICY[ChainId.ICE_MAINNET]), CurrencyAmount.ether(JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapTokensForExactICY')
        expect(result.args.slice(0, -1)).toEqual([
          '0x64',
          '0x80',
          [token1.address, token0.address, WICY[ChainId.ICE_MAINNET].address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
      it('token0 to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactOut(new Route([pair_0_1], token0, token1), new TokenAmount(token1, JSBI.BigInt(100))),
          { ttl: 50, recipient: '0x0000000000000000000000000000000000000004', allowedSlippage: new Percent('1', '100') }
        )
        expect(result.methodName).toEqual('swapTokensForExactTokens')
        expect(result.args.slice(0, -1)).toEqual([
          '0x64',
          '0x71',
          [token0.address, token1.address],
          '0x0000000000000000000000000000000000000004'
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
    })
    describe('supporting fee on transfer', () => {
      describe('exact in', () => {
        it('ether to token1', () => {
          const result = Router.swapCallParameters(
            Trade.exactIn(new Route([pair_weth_0, pair_0_1], CICY[ChainId.ICE_MAINNET], token1), CurrencyAmount.ether(JSBI.BigInt(100))),
            {
              ttl: 50,
              recipient: '0x0000000000000000000000000000000000000004',
              allowedSlippage: new Percent('1', '100'),
              feeOnTransfer: true
            }
          )
          expect(result.methodName).toEqual('swapExactICYForTokensSupportingFeeOnTransferTokens')
          expect(result.args.slice(0, -1)).toEqual([
            '0x51',
            [WICY[ChainId.ICE_MAINNET].address, token0.address, token1.address],
            '0x0000000000000000000000000000000000000004'
          ])
          expect(result.value).toEqual('0x64')
          checkDeadline(result.args[result.args.length - 1])
        })
        it('token1 to ether', () => {
          const result = Router.swapCallParameters(
            Trade.exactIn(new Route([pair_0_1, pair_weth_0], token1, CICY[ChainId.ICE_MAINNET]), new TokenAmount(token1, JSBI.BigInt(100))),
            {
              ttl: 50,
              recipient: '0x0000000000000000000000000000000000000004',
              allowedSlippage: new Percent('1', '100'),
              feeOnTransfer: true
            }
          )
          expect(result.methodName).toEqual('swapExactTokensForICYSupportingFeeOnTransferTokens')
          expect(result.args.slice(0, -1)).toEqual([
            '0x64',
            '0x51',
            [token1.address, token0.address, WICY[ChainId.ICE_MAINNET].address],
            '0x0000000000000000000000000000000000000004'
          ])
          expect(result.value).toEqual('0x0')
          checkDeadline(result.args[result.args.length - 1])
        })
        it('token0 to token1', () => {
          const result = Router.swapCallParameters(
            Trade.exactIn(new Route([pair_0_1], token0, token1), new TokenAmount(token0, JSBI.BigInt(100))),
            {
              ttl: 50,
              recipient: '0x0000000000000000000000000000000000000004',
              allowedSlippage: new Percent('1', '100'),
              feeOnTransfer: true
            }
          )
          expect(result.methodName).toEqual('swapExactTokensForTokensSupportingFeeOnTransferTokens')
          expect(result.args.slice(0, -1)).toEqual([
            '0x64',
            '0x59',
            [token0.address, token1.address],
            '0x0000000000000000000000000000000000000004'
          ])
          expect(result.value).toEqual('0x0')
          checkDeadline(result.args[result.args.length - 1])
        })
      })
      describe('exact out', () => {
        it('ether to token1', () => {
          expect(() =>
            Router.swapCallParameters(
              Trade.exactOut(
                new Route([pair_weth_0, pair_0_1], CICY[ChainId.ICE_MAINNET], token1),
                new TokenAmount(token1, JSBI.BigInt(100))
              ),
              {
                ttl: 50,
                recipient: '0x0000000000000000000000000000000000000004',
                allowedSlippage: new Percent('1', '100'),
                feeOnTransfer: true
              }
            )
          ).toThrow('EXACT_OUT_FOT')
        })
        it('token1 to ether', () => {
          expect(() =>
            Router.swapCallParameters(
              Trade.exactOut(new Route([pair_0_1, pair_weth_0], token1, CICY[ChainId.ICE_MAINNET]), CurrencyAmount.ether(JSBI.BigInt(100))),
              {
                ttl: 50,
                recipient: '0x0000000000000000000000000000000000000004',
                allowedSlippage: new Percent('1', '100'),
                feeOnTransfer: true
              }
            )
          ).toThrow('EXACT_OUT_FOT')
        })
        it('token0 to token1', () => {
          expect(() =>
            Router.swapCallParameters(
              Trade.exactOut(new Route([pair_0_1], token0, token1), new TokenAmount(token1, JSBI.BigInt(100))),
              {
                ttl: 50,
                recipient: '0x0000000000000000000000000000000000000004',
                allowedSlippage: new Percent('1', '100'),
                feeOnTransfer: true
              }
            )
          ).toThrow('EXACT_OUT_FOT')
        })
      })
    })
  })
})
