import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      '*': {
        WebkitTapHighlightColor: 'transparent',
        overflowWrap: 'break-word',
      },
      a: {
        display: 'block',
      },
      img: {
        display: 'block',
      },
      body: {
        height: '100%',
        backgroundColor: 'gray.50',
      },
    },
  },
})
