import { Resolver, zodResolver } from '@hookform/resolvers/zod'
import {
  DeepPartial,
  FieldValues,
  useForm as _useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

type Unbox<T> = T extends { [k: string]: infer U }
  ? U
  : T extends (infer U)[]
  ? U
  : T
type IsPrimitive<T> = T extends Unbox<T> ? T : never
type DeepNullable<T> = {
  [P in keyof T]?: T[P] extends IsPrimitive<T[P]>
    ? T[P] | undefined
    : DeepNullable<T[P]>
}

type Props<TFieldValues extends FieldValues = FieldValues> = Omit<
  UseFormProps<TFieldValues>,
  'resolver' | 'defaultValues'
> &
  Required<{
    defaultValues: DeepNullable<TFieldValues>
    schema: Parameters<Resolver>[0]
  }>

/**
 * react-hook-formのwrapper
 * defaultValuesとzodのschemaを必須に設定する
 * @see https://zenn.dev/yuitosato/articles/292f13816993ef#1.-useform%E3%82%92%E3%83%A9%E3%83%83%E3%83%97%E3%81%97%E3%81%A6%E3%82%BF%E3%82%A4%E3%83%97%E3%82%BB%E3%83%BC%E3%83%95%E3%81%AB%E3%81%99%E3%82%8B
 */
export const useForm = <TFieldValues extends FieldValues = FieldValues>({
  defaultValues: _defaultValues,
  schema,
  ...props
}: Props<TFieldValues>): UseFormReturn<TFieldValues> => {
  /**
   *
   * react hook formのdefaultValuesの型がDeepPartial<TFieldValues>しか入らないので無理やりキャストする
   */
  const defaultValues = _defaultValues as unknown as DeepPartial<TFieldValues>
  return _useForm({ ...props, defaultValues, resolver: zodResolver(schema) })
}
