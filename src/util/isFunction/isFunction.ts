import { z } from 'zod'

export const isFunction = <T extends unknown>(value: T): value is T => {
  try {
    z.function().parse(value)
    return true
  } catch {
    return false
  }
}
