import { Flex, SimpleGrid, Box, useColorMode, Center, Spacer, Button, Image, useDisclosure } from '@chakra-ui/react'
import { packages } from "../myPackage";
import React from 'react'
import { numberFormat } from '../utils'
import { IPackage, IRate, Token } from '../_types_';
import CrowSaleContract from '../contracts/CrowdSaleContract';
import { ethers } from 'ethers';
import UsdtContract from '../contracts/UsdtContract';
import SuccessModal from "./SuccessModal";
import { log } from 'console';
declare var window: any;

export default function Packages() {
    const { colorMode } = useColorMode()
    const [rate, setRate] = React.useState<IRate>()
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false)
    const [pak, setPak] = React.useState<IPackage>()
    const [txHash, setTxHash] = React.useState<string>();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [web3Provider, setWeb3Provider] =
        React.useState<ethers.providers.Web3Provider>();

    const getRate = React.useCallback(async () => {
        const crowdContract = new CrowSaleContract();
        const bnbRate = await crowdContract.getBnbRate();
        const usdtRate = await crowdContract.getUsdtRate();

        console.log({ bnbRate, usdtRate });

        setRate({ bnbRate, usdtRate });

    }, []);

    React.useEffect(() => {
        getRate();
    }, [getRate]);

    const handleBuy = async (pk: IPackage) => {
        // if (!web3Provider) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setWeb3Provider(provider)
        console.log(web3Provider);
        console.log(rate);

        if (!web3Provider) return;
        setPak(pk);
        setIsProcessing(true);
        let hash = '';
        const crowdContract = new CrowSaleContract(web3Provider);
        if (pk.token === Token.USDT) {
            const usdtContract = new UsdtContract(web3Provider);
            if (rate) {
                await usdtContract.approve(crowdContract._contractAddress, (pk.amount / (rate?.bnbRate)))
                hash = await crowdContract.buyTokenByUSDT(pk.amount);
            }
        } else {
            hash = await crowdContract.buyTokenByBNB(pk.amount);
        }
        setTxHash(hash);
        onOpen();
        try {

        } catch (er: any) {

        }
        setPak(undefined);
        setIsProcessing(false);
    }


    return (
        <>
            <SimpleGrid margin={"20px auto"} width={'70%'} columns={[2, null, 3]} spacing={10}>
                {
                    packages.map((element) =>
                        <Box
                            key={element.id}
                            bg={colorMode === 'light' ? '#E8E8E8' : '#0f275f'}
                            rounded={16}
                        >
                            <Box position={"relative"} m={3} mb={-12}>
                                <Image src={element.bg} rounded={12}></Image>

                                <Box position={"relative"} h={"35%"} w={"35%"} border={"5px solid"} borderRadius={"full"} top={"-4em"} margin={"auto"} borderColor={colorMode === 'light' ? '#E8E8E8' : '#0f275f'}>
                                    <Image src={element.icon} rounded={12}></Image>
                                </Box>
                            </Box>
                            <Center p={2} flexDirection={'column'}>
                                <Box mb={6} style={{ fontSize: 20, fontWeight: 700 }}>
                                    {element.name}
                                </Box>
                                <Box mb={8} p={"8px 30px"} border={'1px solid '} borderColor={colorMode === 'light' ? 'black' : 'whiteAlpha.400'} fontWeight={300} borderRadius={"12px"}>
                                    {numberFormat(element.amount)} FLP
                                </Box>
                                <Box mb={3} color={colorMode === 'light' ? 'black' : 'whiteAlpha.800'}>
                                    Amount of coins to pay: &nbsp;
                                    {rate && (element.token === "BNB" ? (element.amount / rate?.bnbRate) : (element.amount / rate?.usdtRate))}
                                    <span style={{ fontWeight: 700, color: colorMode === 'light' ? 'black' : 'white' }}>  {element.token}</span>
                                </Box>
                                <Button backgroundColor={colorMode === 'light' ? '#D3D3D3' : '#0047B8'} w={'full'}
                                    onClick={() => handleBuy(element)}>
                                    Buy Now
                                </Button>
                            </Center>
                        </Box>)
                }
            </SimpleGrid>
            <SuccessModal
                isOpen={isOpen}
                onClose={onClose}
                hash={txHash}
                title="BUY ICO"
            />
        </>
    )
}
