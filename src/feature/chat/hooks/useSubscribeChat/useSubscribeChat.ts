import { useEffect, useState } from 'react'
import { onChildAdded } from '@firebase/database'
import { __DEV__ } from '@src/constant/env'
import { chatDatabaseRef } from '@src/feature/chat/constant/chatDatabaseRef'
import type { Chat } from '@src/feature/chat/model/Chat'
import { chatSchema } from '@src/feature/chat/model/Chat'

export const useSubscribeChat = () => {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    try {
      const db = chatDatabaseRef()
      return onChildAdded(db, (snapshot) => {
        try {
          const chat = chatSchema.safeParse({
            ...snapshot.val(),
            key: snapshot.key,
          })
          if (chat.success) {
            setChats((prev) => [...prev, chat.data])
          }
        } catch (e) {
          __DEV__ && console.error('chatSchema parse error', e)
        }
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
