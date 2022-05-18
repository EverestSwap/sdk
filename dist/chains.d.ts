interface StakingContract {
    address: string;
    active: boolean;
    reward_token: string;
}
export interface Chain {
    id: string;
    name: string;
    chain_id: number;
    mainnet: boolean;
    dex_is_live: boolean;
    tracked_by_debank: boolean;
    supported_by_gelato: boolean;
    rpc_uri: string;
    symbol: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    blockExplorerUrls?: string[];
    token_symbol?: string;
    logo?: string;
    coingecko_id?: string;
    debank_everest_id?: string;
    contracts?: {
        token: string;
        factory: string;
        router: string;
        wrapped_native_token: string;
        local_multisig?: string;
        community_treasury?: string;
        treasury_vester?: string;
        mini_chef?: string;
        timelock?: string;
        migrator?: string;
        airdrop?: string;
        foundation_multisig?: string;
        joint_multisig?: string;
        revenue_distributor?: string;
        governor?: string;
        fee_collector?: string;
        staking?: StakingContract[];
    };
}
export declare const ETHEREUM_MAINNET: Chain;
export declare const ICE_MAINNET: Chain;
export declare const ICE_ARCTIC: Chain;
export declare const CHAINS: Chain[];
export {};
