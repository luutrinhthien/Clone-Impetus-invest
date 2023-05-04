import { Flex, Button, Box, useColorMode, Spacer, SimpleGrid, StackDivider, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Walletinfo from './Walletinfo'
import { ethers } from "ethers";
import { IWalletInfo, IRate, IPackage } from '../_types_';
declare var window: any;
import Packages from './Packages';

export default function Index() {
    const [wallet, setWallet] = React.useState<IWalletInfo>()
    const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>()


    const connectMetaMask = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()

            const address = await signer.getAddress()
            const bigBalance = await signer.getBalance()
            const bnbBalance = Number.parseFloat(ethers.utils.formatEther(bigBalance))
            setWallet({ address, amount: bnbBalance })
            setWeb3Provider(provider)
            console.log("CLICKED!");
        }
        else {
            alert("Please download Meta Mask first!")
        }
    }
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Flex
                margin="50px auto"
                maxWidth={"75%"}
            >
                <Box>
                    <p style={{ fontSize: 30, fontWeight: 600 }}>Blockchain</p>
                </Box>
                <Spacer />
                <Box>
                    <Button variant={'unstyled'} onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    </Button>
                    {!wallet && <Button p={6} borderRadius={15}
                        bgColor={colorMode === 'light' ? 'yellow.400' : 'gray.600'}
                        variant={'ghost'}
                        onClick={connectMetaMask}>
                        Connect Wallet
                    </Button>}
                    {wallet && <Walletinfo
                        adddress={wallet?.address}
                        amount={wallet?.amount || 0} />}

                </Box>
            </Flex>
            <Box margin="50px auto"
                maxWidth={"75%"} fontSize={32} fontWeight={700}>
                PACKAGES
                <Box mt={5} borderBottom={"1px solid"} borderColor={colorMode === 'light' ? 'black' : 'whiteAlpha.400'}></Box>
            </Box>
            {((web3Provider) && <Packages ></Packages>) || <Packages ></Packages>}

        </>
    )
}
