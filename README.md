# Firebaseで作るリアルタイムチャット

## 認証周り

### サインアップ
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
