import { getDatabase, ref } from '@firebase/database'

const PATH = 'chats/'

export const createChatRef = (roomUid: string) => {
  try {
    const db = getDatabase()
    return ref(db, `${PATH}${roomUid}/`)
  } catch (e) {
    throw e
  }
}
