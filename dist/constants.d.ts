import JSBI from 'jsbi';
export declare type BigintIsh = JSBI | bigint | string;
export declare enum ChainId {
    ICE_MAINNET = 550,
    ICE_ARCTIC = 552
}
export declare enum TradeType {
    EXACT_INPUT = 0,
    EXACT_OUTPUT = 1
}
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
export declare const contractAddresses: {
    ICE_MAINNET: {
        TOKEN: string;
        FACTORY: string;
        ROUTER: string;
        WICZ: string;
        CHEF: string;
        AIRDROP: string;
        MULTICALL: string;
    };
    ICE_ARCTIC: {
        TOKEN: string;
        FACTORY: string;
        ROUTER: string;
        WICZ: string;
        CHEF: string;
        AIRDROP: string;
        MULTICALL: string;
    };
};
export declare const FACTORY_ADDRESS: {
    [chainId in ChainId]: string;
};
export declare const INIT_CODE_HASH = "0xd4cc97f7f1105b7d9084d4771a71f7c9772a5b9546b3736add1f2ebe94995713";
export declare const MINIMUM_LIQUIDITY: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const TWO: JSBI;
export declare const THREE: JSBI;
export declare const FIVE: JSBI;
export declare const TEN: JSBI;
export declare const _100: JSBI;
export declare const _997: JSBI;
export declare const _1000: JSBI;
export declare enum SolidityType {
    uint8 = "uint8",
    uint256 = "uint256"
}
export declare const SOLIDITY_TYPE_MAXIMA: {
    uint8: JSBI;
    uint256: JSBI;
};
