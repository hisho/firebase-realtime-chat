import {
  SignUpInput,
  signUpInputSchema,
} from '@src/feature/auth/util/signUp/signUp.input'
import { useForm } from '@src/lib/from/useForm/useForm'
import { signUp } from '@src/feature/auth/util/signUp/signUp'
import { __DEV__ } from '@src/constant/env'
import { FirebaseError } from '@firebase/util'
import { useLoading } from '@src/hooks/useLoading/useLoading'

export const useSignUpForm = () => {
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
      await signUp(input)
      reset()
    } catch (e) {
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
