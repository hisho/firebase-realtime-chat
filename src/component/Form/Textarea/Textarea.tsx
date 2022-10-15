import {
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps,
} from '@chakra-ui/react'

type Props = TextareaProps

export const Textarea = forwardRef<Props, 'textarea'>((props, ref) => {
  return <ChakraTextarea ref={ref} {...props} />
})
