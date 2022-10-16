import {
  sendEmailVerification as firebaseSendEmailVerification,
  User,
} from '@firebase/auth'

type SendEmailVerificationOptions = {
  redirectUrl?: string
}

export const sendEmailVerification = (
  user: User,
  { redirectUrl }: SendEmailVerificationOptions = {}
) => {
  return new Promise<void>((resolve, reject) => {
    ;(async () => {
      try {
        const actionCodeSettings = redirectUrl
          ? {
              url: redirectUrl,
            }
          : undefined

        await firebaseSendEmailVerification(user, actionCodeSettings)
        resolve()
      } catch (e) {
        reject(e)
      }
    })()
  })
}
