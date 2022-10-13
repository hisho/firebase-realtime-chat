import { z } from 'zod'

export const isNull = <T extends null | unknown>(
  value: T
): value is T extends unknown ? Extract<T, null> : T => {
  try {
    z.null().parse(value)
    return true
  } catch {
    return false
  }
}
