import { Avatar, Flex, Text } from '@chakra-ui/react'
import { headerHeight } from '@src/layout/Header/Header'
import { footerHeight } from '@src/layout/Footer/Footer'
import { useSubscribeChat } from '@src/feature/chat/hooks/useSubscribeChat/useSubscribeChat'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { useEffect } from 'react'

export const Chats = () => {
  const { chats } = useSubscribeChat()
  const authUser = useAuthContext()

  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [chats])

  return (
    <Flex
      pt={2}
      id={'scroll-area'}
      height={`calc(100vh - ${headerHeight} - ${footerHeight} - ${14 * 4}px)`}
      overflowY={'auto'}
      flexDirection={'column'}
    >
      {chats.map(({ message, user, key }, index) => (
        <Flex
          py={1}
          px={2}
          flexShrink={0}
          alignItems={'start'}
          key={`Chats_${message}_${key}_${index}`}
          flexDirection={authUser?.uid === user.uid ? 'row-reverse' : 'row'}
        >
          <Avatar name={user.name} w={'40px'} h={'40px'} flexShrink={0} />
          <Text
            bgColor={'gray.100'}
            w={'full'}
            rounded={'4px'}
            py={1}
            px={2}
            ml={authUser?.uid === user.uid ? 0 : 2}
            mr={authUser?.uid === user.uid ? 2 : 0}
            fontSize={'14px'}
            fontWeight={'medium'}
          >
            {message}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
