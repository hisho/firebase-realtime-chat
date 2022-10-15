import { z } from 'zod'

export const isNull = <T extends null | unknown>(
  value: T
): value is T extends unknown ? Extract<T, null> : T => {
  return z.null().safeParse(value).success
}
