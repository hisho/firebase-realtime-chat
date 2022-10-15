import { z } from 'zod'

export const isNullish = <T extends unknown | null | undefined>(
  value: T
): value is T extends unknown ? Extract<T, null | undefined> : T => {
  return z.null().or(z.undefined()).safeParse(value).success
}
