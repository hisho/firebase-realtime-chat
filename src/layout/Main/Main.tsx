import { Container } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Main = ({ children }: Props) => {
  return (
    <Container
      as={'main'}
      flex={1}
      display={'flex'}
      flexDirection={'column'}
      minHeight={0}
    >
      {children}
    </Container>
  )
}
