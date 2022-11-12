import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, Heading } from '@chakra-ui/react'
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
  const { query, isReady } = useRouter()
  const [room, setRoom] = useState<Room | undefined>(undefined)
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
  }, [query, isReady])

  const { renderCreateChatMessageForm } = useCreateChatMessageForm(
    roomUid.success ? roomUid.data.room_uid : '',
    {
      onCompleted: () => {
        const scrollArea = document.getElementById('scroll-area')
        if (scrollArea) {
          scrollArea.scrollTop = scrollArea.scrollHeight
        }
      },
    }
  )

  return (
    <>
      <Head>
        <title>{room?.name}</title>
      </Head>
      <Box
        display={'flex'}
        flexDirection={'column'}
        minHeight={0}
        flex={1}
        mx={-4}
      >
        <Heading px={2} borderBottomWidth={1}>
          {room?.name}
        </Heading>
        <Box display={'flex'} flexDirection={'column'} minHeight={0} flex={1}>
          <Box
            pb={2}
            overflowY={'auto'}
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            minHeight={0}
          >
            <Chats />
          </Box>
          <Box>{renderCreateChatMessageForm()}</Box>
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
