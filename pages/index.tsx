import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Box, Flex } from '@chakra-ui/react'
import Main from '../src/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Main></Main>
  )
}
