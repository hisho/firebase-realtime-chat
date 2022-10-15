# Firebase で作るリアルタイムチャット

## Firebase の初期化

firebase の app を初期化する関数を作成  
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

## チャット周り

### チャット送信

```tsx
import { getDatabase, push, ref } from '@firebase/database'
import { FirebaseError } from 'firebase/app'

const sendChatMessage = async () => {
  try {
    const db = getDatabase()
    const dbRef = ref(db, 'chat')
    await push(dbRef, {
      message: 'test',
    })
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
  }
}
```

### チャット取得、表示

```tsx
import { useEffect, useState } from 'react'
import { getDatabase, onChildAdded, ref } from '@firebase/database'

export const App = () => {
  const [chats, setChats] = useState<{ message: string }[]>([])

  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      return onChildAdded(dbRef, (snapshot) => {
        const value = snapshot.val()
        setChats((prev) => [...prev, { message: value.message }])
      })
    } catch (e) {
      console.error(e)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {chats.map((chat, i) => (
        <div key={`${chat.message}_${i}`}>{chat.message}</div>
      ))}
    </div>
  )
}
```

## 使用技術

### UI

- Chakra UI

### Backend

- Firebase

### Form

- React Hook Form

### validation

- Zod

### test

- Jest
