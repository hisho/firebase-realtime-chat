import type { MaybeRenderProp } from '@chakra-ui/react-utils'
import { runIfFn } from '@chakra-ui/utils'

type RangeProps = {
  readonly children: MaybeRenderProp<{ index: number }>
  readonly length: number
}

export const Range = ({ children, length }: RangeProps) => {
  return (
    <>{[...Array(length)].map((_, i) => runIfFn(children, { index: i }))}</>
  )
}
