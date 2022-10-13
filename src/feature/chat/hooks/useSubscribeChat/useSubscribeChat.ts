import { useEffect, useState } from 'react'
import { onChildAdded } from '@firebase/database'
import { __DEV__ } from '@src/constant/env'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'

export const useSubscribeChat = () => {
  const [chats, setChats] = useState<string[]>([])

  useEffect(() => {
    try {
      const db = chatDatabaseRef()
      return onChildAdded(db, (snapshot) => {
        //TODO: val()を検証する
        setChats((prev) => [...prev, snapshot.val().message])
      })
    } catch (e) {
      __DEV__ && console.error(e)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    chats,
  }
}
