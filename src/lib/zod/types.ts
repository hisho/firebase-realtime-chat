import type { z } from 'zod'

/**
 * @see https://zenn.dev/uttk/articles/bd264fa884e026#%E5%9E%8B%E5%BC%95%E6%95%B0%E3%81%AE%E6%B8%A1%E3%81%97%E6%96%B9
 */
export type ToZod<T extends Record<string, unknown>> = {
  [K in keyof T]-?: z.ZodType<T[K]>
}
