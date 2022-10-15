import { getDatabase, ref } from '@firebase/database'

const PATH = 'chats/'

export const chatDatabaseRef = () => {
  try {
    const db = getDatabase()
    return ref(db, PATH)
  } catch (e) {
    throw e
  }
}
