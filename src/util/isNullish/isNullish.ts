import { z } from 'zod'

export const isNullish = <T extends unknown>(value: T): value is T => {
  try {
    z.null().or(z.undefined()).parse(value)
    return true
  } catch {
    return false
  }
}
