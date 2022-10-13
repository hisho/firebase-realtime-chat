import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

type AuthState = User | null | undefined
const AuthContext = createContext<AuthState>(undefined)

/**
 * @see https://beta.reactjs.org/learn/you-might-not-need-an-effect#initializing-the-application
 */
let didInit = false

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthState>(undefined)

  useEffect(() => {
    if (!didInit) {
      didInit = true
      return
    }
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
