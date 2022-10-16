export const __DEV__ = process.env.NODE_ENV === 'development'

const throwErrorMessage = (
  key: string,
  fileName: '.env' | '.env.local' = '.env'
) => {
  __DEV__ &&
    console.error(
      `The environment variable ${key} is not defined in ${fileName}`
    )
  return ''
}

export const FRONTEND_URL =
  process.env['NEXT_PUBLIC_VERCEL_URL'] ??
  throwErrorMessage('NEXT_PUBLIC_VERCEL_URL', '.env')
export const FIREBASE_API_KEY =
  process.env['NEXT_PUBLIC_FIREBASE_API_KEY'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_API_KEY', '.env.local')
export const FIREBASE_AUTH_DOMAIN =
  process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', '.env.local')
export const FIREBASE_PROJECT_ID =
  process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_PROJECT_ID', '.env.local')
export const FIREBASE_STORAGE_BUCKET =
  process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', '.env.local')
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '.env.local')
export const FIREBASE_APP_ID =
  process.env['NEXT_PUBLIC_FIREBASE_APP_ID'] ??
  throwErrorMessage('NEXT_PUBLIC_FIREBASE_APP_ID', '.env.local')
