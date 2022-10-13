import { useLoading } from '@src/hooks/useLoading/useLoading'
import { signOut } from '@src/feature/auth/util/signOut/signOut'
import { FirebaseError } from '@firebase/util'
import { __DEV__ } from '@src/constant/env'

type Args = Partial<{
  onCompleted: () => void
  onError: () => void
}>

export const useSignOut = ({ onCompleted, onError }: Args = {}) => {
  const { startLoading, stopLoading, isLoading } = useLoading()

  const handleSignOut = async () => {
    startLoading()
    try {
      await signOut()
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

  return { isLoading, handleSignOut } as const
}
