import { forwardRef, Input as ChakraInput, InputProps } from '@chakra-ui/react'

type Props = InputProps

export const Input = forwardRef<Props, 'input'>((props, ref) => {
  return <ChakraInput ref={ref} {...props} />
})
