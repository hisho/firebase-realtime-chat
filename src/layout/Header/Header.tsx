import {
  Avatar,
  chakra,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { Spacer } from '@src/component/Spacer/Spacer'

export const Header = () => {
  const user = useAuthContext()
  return (
    <chakra.header py={10} bgColor={'blue.800'}>
      <Container>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Heading color={'white'}>firebase chat</Heading>
          <Spacer />
          <Menu>
            <MenuButton>
              <Avatar
                name={user?.displayName ?? '未設定'}
                flexShrink={0}
                size={'sm'}
              />
            </MenuButton>
            <MenuList py={0}>
              <MenuItem>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </chakra.header>
  )
}
