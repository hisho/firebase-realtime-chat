import type { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { Footer } from '@src/layout/Footer/Footer'
import { Header } from '@src/layout/Header/Header'
import { Main } from '@src/layout/Main/Main'

type Props = {
  children: ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <Box display={'contents'}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  )
}
