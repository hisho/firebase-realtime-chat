# Firebaseで作るリアルタイムチャット

## Firebaseの初期化
firebaseのappを初期化する関数を作成   
`!getApps().length ? initializeApp(firebaseConfig) : getApp()`ですでに初期化されている場合は初期化しないようにする   
https://firebase.google.com/docs/web/setup?hl=ja#add-sdks-initialize

```ts
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@src/constant/env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
}

export const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp()
```

```tsx
initializeFirebaseApp()
const App = () => {
  return <div>App</div>
}
```

## 認証周り

### サインアップ
https://firebase.google.com/docs/auth/web/password-auth?hl=ja#create_a_password-based_account
```tsx
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

const signUp = async () => {
  try {
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}
```

### サインイン
https://firebase.google.com/docs/auth/web/password-auth?hl=ja#sign_in_a_user_with_an_email_address_and_password
```tsx
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

const signIn = async () => {
  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}
```

### サインアウト
https://firebase.google.com/docs/auth/web/password-auth?hl=ja#next_steps
```tsx
import { getAuth, signOut } from 'firebase/auth'

const signOut = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}
```

### 認証状態取得
https://firebase.google.com/docs/auth/web/manage-users?hl=ja#get_the_currently_signed-in_user
```tsx
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const App = () => {
  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      setUser(user)
    })
  }, [])
  
  return null
}
```
