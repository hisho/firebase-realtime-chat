import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { Box, Grid, Text } from '@chakra-ui/react'

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
          <Box key={`Room_${id}_${index}`} px={4} py={2} bgColor={'blue.50'}>
            <Text fontSize={'18px'} fontWeight={'bold'}>
              {name}
            </Text>
            <Text noOfLines={3} fontSize={'14px'}>
              {description}
            </Text>
          </Box>
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
