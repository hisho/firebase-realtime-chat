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
      'html, body,#__next': {
        height: '100%',
        '&': {
          height: '100svh',
        },
      },
      '#__next': {
        backgroundColor: 'gray.50',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
})
