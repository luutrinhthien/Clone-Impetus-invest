// import * as dotenv from "dotenv"
// dotenv.config()

export type AddressType = {
    97: string,
    56: string
}

export enum CHAIN_ID {
    TESTNET = 97,
    MAINNET = 56
}

export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID
    if (!env) { return 97 }
    else { return parseInt(env) }
}

export const getRPC = () => {
    if (getChainIdFromEnv() === CHAIN_ID.TESTNET)
        return process.env.NEXT_PUBLIC_RPC_TESTNET
    return process.env.NEXT_PUBLIC_RPC_MAINNET
}

export const SMART_CONTRACT_ADDRESS = {
    CROWD_SALE: { 97: "0x2f4dC4848cAfeAEc3f92AcB1B08d727fdbEd50dD", 56: "" },
    USDT: { 97: "0xf5a5f48819F7befF2aD9A211e5769730c2fA662a", 56: "" },
}