import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { initializeFirebaseApp } from '@src/lib/firebase/initializeFirebase'
import { theme } from '@src/lib/chakra/theme'

initializeFirebaseApp()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
