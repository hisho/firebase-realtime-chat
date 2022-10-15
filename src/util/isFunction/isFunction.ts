import { z } from 'zod'

export const isFunction = <T extends unknown | Function>(
  value: T
): value is T extends unknown ? Extract<T, Function> : T => {
  return z.function().safeParse(value).success
}
