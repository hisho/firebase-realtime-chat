import { z } from 'zod'

export const isFunction = <T extends unknown | Function>(
  value: T
): value is T extends unknown ? Extract<T, Function> : T => {
  try {
    z.function().parse(value)
    return true
  } catch {
    return false
  }
}
