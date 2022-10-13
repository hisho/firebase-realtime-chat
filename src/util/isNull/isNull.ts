import { z } from 'zod'

export const isNull = <T extends unknown>(value: T): value is T => {
  try {
    z.null().parse(value)
    return true
  } catch {
    return false
  }
}
