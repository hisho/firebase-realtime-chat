import type {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

export type RHFControllerProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'name' | 'control'
> &
  Required<{
    readonly control: Control<T>
    readonly name: FieldPath<T>
  }>
