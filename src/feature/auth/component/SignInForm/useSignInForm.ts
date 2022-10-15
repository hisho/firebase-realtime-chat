import { useForm } from '@src/lib/from/useForm/useForm'
import { __DEV__ } from '@src/constant/env'
import { FirebaseError } from '@firebase/util'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import type { SignInInput } from '@src/feature/auth/util/signIn/signIn.input'
import { signInSchema } from '@src/feature/auth/util/signIn/signIn.input'
import { signIn } from '@src/feature/auth/util/signIn/signIn'

type Args = Partial<{
  onCompleted: () => void
  onError: () => void
}>

export const useSignInForm = ({ onCompleted, onError }: Args = {}) => {
  const { startLoading, stopLoading, isLoading } = useLoading()
  const form = useForm<SignInInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    schema: signInSchema,
  })
  const { reset } = form

  const handleSignIn = async (input: SignInInput) => {
    startLoading()
    try {
      await signIn(input)
      reset()
      onCompleted?.()
    } catch (e) {
      onError?.()
      if (e instanceof FirebaseError) {
        __DEV__ && console.error(e)
      }
    } finally {
      stopLoading()
    }
  }

  return {
    form,
    handleSignIn,
    isLoading,
  } as const
}

export type UseSignInFormReturn = ReturnType<typeof useSignInForm>
