import {
  SignUpInput,
  signUpInputSchema,
} from '@src/feature/auth/util/signUp/signUp.input'
import { useForm } from '@src/lib/from/useForm/useForm'
import { signUp } from '@src/feature/auth/util/signUp/signUp'
import { __DEV__, FRONTEND_URL } from '@src/constant/env'
import { FirebaseError } from '@firebase/util'
import { useLoading } from '@src/hooks/useLoading/useLoading'
import { sendEmailVerification } from '@src/feature/auth/util/sendEmailVerification/sendEmailVerification'
import { pagesPath } from '@src/lib/pathpida/$path'

type Args = Partial<{
  onCompleted: () => void
  onError: () => void
}>

export const useSignUpForm = ({ onCompleted, onError }: Args = {}) => {
  const { startLoading, stopLoading, isLoading } = useLoading()
  const form = useForm<SignUpInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    schema: signUpInputSchema,
  })
  const { reset } = form

  const handleSignUp = async (input: SignUpInput) => {
    startLoading()
    try {
      const userCredential = await signUp(input)
      await sendEmailVerification(userCredential.user, {
        redirectUrl: `${FRONTEND_URL}${pagesPath.account.$url().pathname}`,
      })
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
    handleSignUp,
    isLoading,
  } as const
}

export type UseSignUpFormReturn = ReturnType<typeof useSignUpForm>
