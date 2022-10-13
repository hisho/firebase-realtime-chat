import { z } from 'zod'

export const isUndefined = <T extends unknown | undefined>(
  value: T
): value is T extends unknown ? Extract<T, undefined> : T => {
  try {
    z.undefined().parse(value)
    return true
  } catch {
    return false
  }
}
