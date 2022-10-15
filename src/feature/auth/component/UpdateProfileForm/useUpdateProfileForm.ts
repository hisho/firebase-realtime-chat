import { useForm } from '@src/lib/from/useForm/useForm'
import {
  UpdateProfileInput,
  updateProfileSchema,
} from '@src/feature/auth/util/updateProfile/updateProfile.input'
import { updateProfile } from '@src/feature/auth/util/updateProfile/updateProfile'
import type { GlobalAuthState } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { FirebaseError } from 'firebase/app'
import { __DEV__ } from '@src/constant/env'
import { isNullish } from '@src/util/isNullish/isNullish'
import { useLoading } from '@src/hooks/useLoading/useLoading'

type Args = Partial<{
  onCompleted: () => void
  onError: () => void
}>

export const useUpdateProfileForm = ({ onCompleted, onError }: Args = {}) => {
  const form = useForm<UpdateProfileInput>({
    defaultValues: {
      displayName: '',
    },
    schema: updateProfileSchema,
  })
  const { reset } = form
  const { stopLoading, startLoading, isLoading } = useLoading()

  const handleUpdateProfile = async (
    user: GlobalAuthState,
    input: UpdateProfileInput
  ) => {
    startLoading()
    if (isNullish(user)) {
      stopLoading()
      return
    }

    try {
      await updateProfile(user, input)
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

  return { form, handleUpdateProfile, isLoading } as const
}

export type UseUpdateProfileFormReturn = ReturnType<typeof useUpdateProfileForm>
