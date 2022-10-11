import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from '@firebase/auth'
import type { SignInInput } from '@src/feature/auth/util/signIn/signIn.input'

export const signIn = ({ email, password }: SignInInput) => {
  return new Promise<UserCredential>((resolve, reject) => {
    ;(async () => {
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        resolve(userCredential)
      } catch (e) {
        reject(e)
      }
    })()
  })
}
