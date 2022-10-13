import { z } from 'zod'

export const isFunction = (value: unknown): boolean => {
  try {
    z.function().parse(value)
    return true
  } catch {
    return false
  }
}
