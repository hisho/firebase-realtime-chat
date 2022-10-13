import type { ReactNode } from 'react'
import { Box, Container, Flex } from '@chakra-ui/react'
import { Footer } from '@src/layout/Footer/Footer'
import { Header } from '@src/layout/Header/Header'

type Props = {
  children: ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <Flex flexDirection={'column'} h={'inherit'}>
      <Header />
      <Container flex={1}>{children}</Container>
      <Box mt={'auto'}>
        <Footer />
      </Box>
    </Flex>
  )
}
