import { getAuth, signOut as firebaseSignOut } from '@firebase/auth'

export const signOut = () => {
  return new Promise<void>((resolve, reject) => {
    ;(async () => {
      try {
        const auth = getAuth()
        await firebaseSignOut(auth)
        resolve()
      } catch (e) {
        reject(e)
      }
    })()
  })
}
