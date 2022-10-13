import type { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '@src/layout/Footer/Footer'
import { Header } from '@src/layout/Header/Header'

type Props = {
  children: ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <Flex flexDirection={'column'} h={'inherit'}>
      <Header />
      <Box flex={1}>{children}</Box>
      <Box mt={'auto'}>
        <Footer />
      </Box>
    </Flex>
  )
}
