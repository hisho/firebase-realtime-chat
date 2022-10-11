import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { __DEV__ } from '@src/constant/env'

type AuthState = User | null | undefined
const AuthContext = createContext<AuthState>(undefined)

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthState>(undefined)

  useEffect(() => {
    try {
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => {
        setUser(user)
      })
    } catch (e) {
      __DEV__ && console.error(e)
      return
    }
  }, [])
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
