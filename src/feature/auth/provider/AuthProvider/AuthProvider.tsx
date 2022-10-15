import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

export type GlobalAuthState = User | null | undefined
const AuthContext = createContext<GlobalAuthState>(undefined)

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(undefined)

  useEffect(() => {
    try {
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => {
        setUser(user)
      })
    } catch (error) {
      setUser(undefined)
      throw error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
