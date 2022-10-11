import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from '@firebase/auth'
import type { SignUpInput } from '@src/feature/auth/util/signUp/signUp.input'

export const signUp = ({ email, password }: SignUpInput) => {
  return new Promise<UserCredential>((resolve, reject) => {
    ;(async () => {
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
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
