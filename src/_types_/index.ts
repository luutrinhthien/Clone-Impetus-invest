export interface IWalletInfo {
    address: string,
    amount: number
}

export interface IRate {
    usdtRate: number,
    bnbRate: number
}

export enum Token {
    BNB = 'BNB',
    USDT = 'USDT'
}

export interface IPackage {
    id: number,
    key: string;
    name: string;
    amount: number;
    icon: string;
    bg: string;
    token: Token;
}