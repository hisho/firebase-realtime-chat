import type { ReactNode } from 'react'
import { Footer } from '@src/layout/Footer/Footer'
import { Header } from '@src/layout/Header/Header'
import { Main } from '@src/layout/Main/Main'

type Props = {
  children: ReactNode
}

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
