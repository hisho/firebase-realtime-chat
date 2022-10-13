import { z } from 'zod'

export const isNullish = (value: unknown): boolean => {
  try {
    z.null().or(z.undefined()).parse(value)
    return true
  } catch {
    return false
  }
}
