import { z } from 'zod'

export const signUpInputSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が不正です' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上で入力してください' }),
})

export type SignUpInput = z.infer<typeof signUpInputSchema>
