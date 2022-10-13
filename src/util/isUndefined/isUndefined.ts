import { z } from 'zod'

export const isUndefined = (value: unknown): boolean => {
  try {
    z.undefined().parse(value)
    return true
  } catch {
    return false
  }
}
