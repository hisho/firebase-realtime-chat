import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box } from '@chakra-ui/react'
import { useCreateChatMessageForm } from '@src/feature/chat/component/CreateChatMessageForm/useCreateChatMessageForm'
import { Chats } from '@src/feature/chat/component/Chats/Chats'
import { useEffect, useState } from 'react'
import type { Room } from '@src/feature/rooms/model/Room'
import { roomSchema } from '@src/feature/rooms/model/Room'
import { __DEV__ } from '@src/constant/env'
import { doc, getDoc } from '@firebase/firestore'
import { roomsDatabaseCollectionRef } from '@src/feature/rooms/constant/roomDatabaseRef'
import { useRouter } from 'next/router'
import { z } from 'zod'
import Head from 'next/head'

const Page: NextPageWithLayout = () => {
  const { query } = useRouter()
  const [room, setRoom] = useState<Room | undefined>(undefined)
  const roomUid = z
    .object({
      room_uid: z.string(),
    })
    .safeParse(query)

  useEffect(() => {
    if (!roomUid.success) {
      return
    }
    ;(async () => {
      try {
        const db = roomsDatabaseCollectionRef()
        const data = await getDoc(doc(db, roomUid.data.room_uid))
        const parsedRoom = roomSchema.safeParse({
          uid: data.id,
          ...data.data(),
        })
        setRoom(parsedRoom.success ? parsedRoom.data : undefined)
      } catch (e) {
        __DEV__ && console.log(e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomUid])

  const { renderCreateChatMessageForm } = useCreateChatMessageForm({
    onCompleted: () => {
      const scrollArea = document.getElementById('scroll-area')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    },
  })

  return (
    <>
      <Head>
        <title>{room?.name}</title>
      </Head>
      <Box pb={'120px'} pos={'relative'}>
        <Box mx={-4}>
          <Chats />
        </Box>
        <Box pos={'absolute'} insetX={-2} bottom={2}>
          {renderCreateChatMessageForm()}
        </Box>
      </Box>
    </>
  )
}

Page.getLayout = (page) => {
  return (
    <BaseLayout>
      <AuthGuard>{page}</AuthGuard>
    </BaseLayout>
  )
}

export default Page
