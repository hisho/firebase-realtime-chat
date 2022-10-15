import type { InputProps } from '@chakra-ui/react'
import { Input } from '@src/component/Form/Input/Input'
import type { RHFControllerProps } from '@src/component/Form/types'
import { FieldValues, useController } from 'react-hook-form'

export type InputControlProps<T extends FieldValues> = Omit<
  InputProps,
  'name'
> &
  RHFControllerProps<T>

/**
 * chakraのInputとRHFを連携したComponent
 * @see https://chakra-ui.com/docs/components/form/input#import
 */
export const InputControl = <T extends FieldValues>({
  control,
  name,
  onChange,
  ...props
}: InputControlProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
  })
  return (
    <Input
      {...props}
      {...field}
      value={field.value ?? ''}
      onChange={(e) => {
        field.onChange(e)
        onChange?.(e)
      }}
    />
  )
}
