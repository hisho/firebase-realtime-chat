import type { TextareaProps } from '@chakra-ui/react'
import type { RHFControllerProps } from '@src/component/Form/types'
import { FieldValues, useController } from 'react-hook-form'
import { Textarea } from '@src/component/Form/Textarea/Textarea'

export type TextareaControlProps<T extends FieldValues> = Omit<
  TextareaProps,
  'name'
> &
  RHFControllerProps<T>

/**
 * chakraのTextareaとRHFを連携したComponent
 * @see https://chakra-ui.com/docs/components/form/input#import
 */
export const TextareaControl = <T extends FieldValues>({
  control,
  name,
  onChange,
  ...props
}: TextareaControlProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
  })
  return (
    <Textarea
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
