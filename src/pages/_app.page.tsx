import { ChakraProvider, Container } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/initializeFirebase'
import { theme } from '@src/lib/chakra/theme'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next/types'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider/AuthProvider'

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
      <AuthProvider>
        <Container
          flex={1}
          display={'flex'}
          px={0}
          flexDirection={'column'}
          minHeight={0}
          bgColor={'white'}
        >
          {getLayout(<Component {...pageProps} />, pageProps)}
        </Container>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
