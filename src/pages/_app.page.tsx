import { ChakraProvider, Container } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/initializeFirebase'
import { theme } from '@src/lib/chakra/theme'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next/types'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { footerHeight } from '@src/layout/Footer/Footer'
import { headerHeight } from '@src/layout/Header/Header'

initializeFirebaseApp()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <Container
        h={'100vh'}
        bgColor={'white'}
        px={0}
        display={'grid'}
        gridTemplateRows={`${headerHeight} calc(100vh - ${headerHeight} - ${footerHeight}) ${footerHeight}`}
      >
        <AuthProvider>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </AuthProvider>
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
