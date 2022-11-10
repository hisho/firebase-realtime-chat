import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { useRooms } from '@src/feature/rooms/hooks/useRooms/useRooms'
import { Box, chakra, Grid, Heading } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'
import { RoomCard } from '@src/feature/rooms/component/RoomCard/RoomCard'
import { Spacer } from '@src/component/Spacer/Spacer'
import { Range } from '@src/component/Rnage/Rnage'

const Page: NextPageWithLayout = () => {
  const { rooms, isLoading } = useRooms({ limit: 4 })

  return (
    <Box py={10}>
      <Heading fontSize={'24px'}>最近作成されたルーム</Heading>
      <Spacer h={4} />
      <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
        {isLoading ? (
          <Range length={4}>
            {({ index }) => (
              <RoomCard.Skeleton key={`RoomCard.Skeleton_${index}`} />
            )}
          </Range>
        ) : (
          rooms.map((room, index) => (
            <Navigate
              key={`RoomCard_${room.uid}_${index}`}
              href={(path) => path.rooms._room_uid(room.uid).chat.$url()}
            >
              <chakra.a _hover={{ opacity: 0.8 }}>
                <RoomCard room={room} />
              </chakra.a>
            </Navigate>
          ))
        )}
      </Grid>
    </Box>
  )
}

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>
}

export default Page
