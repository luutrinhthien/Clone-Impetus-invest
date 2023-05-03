import { Button, ButtonSpinner, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { numberFormat, showShortAddress } from '../utils'

interface IProps {
    adddress?: string,
    amount: number
}

export default function Walletinfo({ adddress, amount }: IProps) {
    return (
        <Button p={5} borderRadius={12} backgroundColor={'transparent'} style={{ border: "2px solid gray" }} color={'yellow.600'}>
            <HStack>
                <Text>{showShortAddress(adddress)}</Text>
                <Image pl={3} src='bnb.png' height={6}></Image>
                <Text>{numberFormat(amount)}</Text>
            </HStack>
        </Button>
    )
}
