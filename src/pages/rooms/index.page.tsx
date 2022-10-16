import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, chakra, Grid, Text } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'
import { useRooms } from '@src/feature/rooms/hooks/useRooms/useRooms'

const Page: NextPageWithLayout = () => {
  const { rooms, isLoading } = useRooms()

  return (
    <Box py={10}>
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
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
      )}
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
