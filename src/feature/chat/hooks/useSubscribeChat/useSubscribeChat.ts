import { useEffect, useState } from 'react'
import { onChildAdded } from '@firebase/database'
import { __DEV__ } from '@src/constant/env'
import { createChatRef } from '@src/feature/chat/constant/chatDatabaseRef'
import type { Chat } from '@src/feature/chat/model/Chat'
import { chatSchema } from '@src/feature/chat/model/Chat'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useLoading } from '@src/hooks/useLoading/useLoading'

export const useSubscribeChat = () => {
  const { startLoading, stopLoading, isLoading } = useLoading()
  const [chats, setChats] = useState<Chat[]>([])
  const { query, isReady } = useRouter()
  const roomUid = z
    .object({
      room_uid: z.string(),
    })
    .safeParse(query)

  useEffect(() => {
    if (!isReady) return
    if (!roomUid.success) {
      return
    }
    startLoading()
    try {
      const db = createChatRef(roomUid.data.room_uid)
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
        } finally {
          stopLoading()
        }
      })
    } catch (e) {
      __DEV__ && console.error(e)
      stopLoading()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, query])

  return {
    chats,
    isLoading,
  }
}
