import { memo } from 'react'

import { Spacer as ChakraSpacer, SpacerProps } from '@chakra-ui/react'

type Props = Pick<SpacerProps, 'h' | 'w'>

export const Spacer = memo((props: Props) => {
  return (
    <ChakraSpacer aria-hidden={'true'} {...props} flex={props.h ? 'none' : 1} />
  )
})

Spacer.displayName = 'Spacer'
