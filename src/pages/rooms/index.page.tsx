import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, chakra, Grid, Text } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'
import { useEffect, useState } from 'react'
import type { Room } from '@src/feature/rooms/model/Room'
import { roomSchema } from '@src/feature/rooms/model/Room'
import { getDocs, orderBy, query } from 'firebase/firestore'
import { __DEV__ } from '@src/constant/env'
import { roomsDatabaseCollectionRef } from '@src/feature/rooms/constant/roomDatabaseRef'

const Page: NextPageWithLayout = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const db = roomsDatabaseCollectionRef()
        const roomsQuery = await query(db, orderBy('createdAt', 'desc'))
        const querySnapshots = await getDocs(roomsQuery)
        const parsedRooms = roomSchema.array().safeParse(
          querySnapshots.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
        )
        setRooms(parsedRooms.success ? parsedRooms.data : [])
      } catch (e) {
        __DEV__ && console.log(e)
      }
    })()
  }, [])

  return (
    <Box py={10}>
      <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
        {rooms.map(({ name, uid, description }, index) => (
          <Navigate
            key={`Room_${uid}_${index}`}
            href={(path) => path.rooms._room_uid(uid).chat.$url()}
          >
            <chakra.a
              px={4}
              py={2}
              bgColor={'blue.50'}
              _hover={{ opacity: 0.8 }}
            >
              <Text fontSize={'18px'} fontWeight={'bold'}>
                {name}
              </Text>
              <Text noOfLines={3} fontSize={'14px'}>
                {description}
              </Text>
            </chakra.a>
          </Navigate>
        ))}
      </Grid>
    </Box>
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
