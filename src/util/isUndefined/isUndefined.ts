import { z } from 'zod'

export const isUndefined = <T extends unknown>(value: T): value is T => {
  try {
    z.undefined().parse(value)
    return true
  } catch {
    return false
  }
}
