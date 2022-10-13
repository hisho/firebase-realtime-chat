import { z } from 'zod'

export const isNull = (value: unknown): boolean => {
  try {
    z.null().parse(value)
    return true
  } catch {
    return false
  }
}
