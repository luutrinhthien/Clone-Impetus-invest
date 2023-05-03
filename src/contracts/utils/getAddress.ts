import { SMART_CONTRACT_ADDRESS, AddressType } from "./common";
import getChainIdFromEnv from "./common";

const getAdress = (address: AddressType) => {
    const CHAIN_ID = getChainIdFromEnv() as keyof AddressType;
    return address[CHAIN_ID]
}

export const getCrowdSaleAddress = () => getAdress(SMART_CONTRACT_ADDRESS.CROWD_SALE)
export const getUsdtAddress = () => getAdress(SMART_CONTRACT_ADDRESS.USDT)