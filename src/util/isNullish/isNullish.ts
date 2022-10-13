import { z } from 'zod'

export const isNullish = <T extends unknown | null | undefined>(
  value: T
): value is T extends unknown ? Extract<T, null | undefined> : T => {
  try {
    z.null().or(z.undefined()).parse(value)
    return true
  } catch {
    return false
  }
}
