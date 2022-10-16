import { getFirestore } from '@firebase/firestore'
import { collection } from 'firebase/firestore'

const PATH = 'rooms/'

export const roomsDatabaseCollectionRef = () => {
  try {
    const db = getFirestore()
    return collection(db, PATH)
  } catch (e) {
    throw e
  }
}
