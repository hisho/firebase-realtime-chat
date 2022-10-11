import {
  Box,
  chakra,
  Flex,
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
} from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import { useMemo } from 'react'
import { z } from 'zod'

/**
 * @see https://chakra-ui.com/docs/components/form/form-control
 */
export type FormControlProps = Omit<
  ChakraFormControlProps,
  'isRequired' | 'label'
> & {
  children: ReactElement
  errorMessages?: string | string[] | null | undefined
  helperText?: string
  isRequired?: boolean
  label?: ReactNode
}

export const FormControl = ({
  children,
  errorMessages: _errorMessages,
  helperText,
  isRequired,
  label,
  ...props
}: FormControlProps) => {
  const errorMessages = useMemo(() => {
    const messages = Array.isArray(_errorMessages)
      ? [..._errorMessages]
      : [_errorMessages]

    return messages.filter((m): m is string => typeof m === 'string')
  }, [_errorMessages])

  const isInvalid = useMemo(() => {
    try {
      z.string().array().min(1).parse(errorMessages)
      return true
    } catch (e) {
      return false
    }
  }, [errorMessages])

  return (
    <ChakraFormControl isInvalid={isInvalid} {...props}>
      <Flex alignItems={'center'}>
        {label && (
          <FormLabel lineHeight={1} mb={0} mr={0} fontSize={'14px'}>
            {label}
            {isRequired && (
              <chakra.span
                color={'red.500'}
                fontSize={'10px'}
                verticalAlign={'top'}
              >
                *
              </chakra.span>
            )}
          </FormLabel>
        )}
        {helperText && (
          <FormHelperText ml={2} mt={0}>
            {helperText}
          </FormHelperText>
        )}
      </Flex>
      <Box mt={label ? '4px' : 0}>{children}</Box>
      {isInvalid && (
        <Grid gap={'4px'} mt={'6px'}>
          {errorMessages.map((errorMessage, index) => (
            <FormErrorMessage
              color={'red.500'}
              fontSize={'12px'}
              key={`FormErrorMessage_${errorMessage}_${index}`}
              lineHeight={1}
              mt={0}
            >
              {errorMessage}
            </FormErrorMessage>
          ))}
        </Grid>
      )}
    </ChakraFormControl>
  )
}
