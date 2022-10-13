import { z } from 'zod'

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: '名前は1文字以上で入力してください' }),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
