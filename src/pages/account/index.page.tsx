import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { Box, Flex, Text } from '@chakra-ui/react'
import { UserAvatar } from '@src/component/Avatar/UserAvatar/UserAvatar'

const Page: NextPageWithLayout = () => {
  const { user } = useAuthContext()

  return (
    <Box pt={2} pb={10}>
      <Flex px={4} py={8} rounded={'md'} bgColor={'blue.50'}>
        <UserAvatar
          name={user?.displayName ?? '未設定'}
          size={'lg'}
          isVerified={user?.emailVerified ?? false}
        />
        <Flex ml={2} justifyContent={'center'} flexDirection={'column'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>
            {user?.displayName}
          </Text>
          <Box>{user?.email}</Box>
        </Flex>
      </Flex>
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
