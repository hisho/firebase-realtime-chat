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
      'html, body': {
        height: '100%',
      },
      '#__next': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
})
