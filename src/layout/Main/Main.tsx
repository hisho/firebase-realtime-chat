import { Container } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Main = ({ children }: Props) => {
  return <Container as={'main'}>{children}</Container>
}
