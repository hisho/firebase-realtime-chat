import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, chakra, Grid, Text } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'

const rooms = [
  {
    name: 'Room 1',
    description: 'This is room 1',
    id: '1',
  },
  {
    name: 'Room 2',
    description:
      'This is room 2 This is room 2 This is room 2 This is room 2 This is room 2 This is room 2 This is room 2 This is room 2 This is room 2',
    id: '2',
  },
]

const Page: NextPageWithLayout = () => {
  return (
    <Box py={10}>
      <Grid gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
        {rooms.map(({ name, id, description }, index) => (
          <Navigate
            key={`Room_${id}_${index}`}
            href={(path) => path.rooms._room_uid(id).chat.$url()}
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
