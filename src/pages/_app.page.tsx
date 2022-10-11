import { ChakraProvider } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/initializeFirebase'
import { theme } from '@src/lib/chakra/theme'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next/types'

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
      <BaseLayout>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </BaseLayout>
    </ChakraProvider>
  )
}

export default MyApp
