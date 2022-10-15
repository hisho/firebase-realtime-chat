import { updateProfile as firebaseUpdateProfile, User } from '@firebase/auth'
import type { UpdateProfileInput } from '@src/feature/auth/util/updateProfile/updateProfile.input'

export const updateProfile = (
  user: User,
  { displayName }: UpdateProfileInput
) => {
  return new Promise<void>((resolve, reject) => {
    ;(async () => {
      try {
        await firebaseUpdateProfile(user, {
          displayName,
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    })()
  })
}
