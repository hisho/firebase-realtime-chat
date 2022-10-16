import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, chakra, Grid } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'
import { useRooms } from '@src/feature/rooms/hooks/useRooms/useRooms'
import { RoomCard } from '@src/feature/rooms/component/RoomCard/RoomCard'

const Page: NextPageWithLayout = () => {
  const { rooms } = useRooms()

  return (
    <Box py={10}>
      <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
        {rooms.map((room, index) => (
          <Navigate
            key={`RoomCard_${room.uid}_${index}`}
            href={(path) => path.rooms._room_uid(room.uid).chat.$url()}
          >
            <chakra.a _hover={{ opacity: 0.8 }}>
              <RoomCard room={room} />
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
