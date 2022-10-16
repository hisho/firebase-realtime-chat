import {
  Avatar,
  Box,
  Button,
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
import { useSignOut } from '@src/feature/auth/hooks/useSignOut/useSignOut'
import { isNullish } from '@src/util/isNullish/isNullish'
import { Navigate } from '@src/component/Navigate/Navigate'
import { useSignInFormModal } from '@src/feature/auth/component/SignInForm/SignInFormModal'

export const headerHeight = '80px'

export const Header = () => {
  const { user } = useAuthContext()
  const { handleSignOut } = useSignOut()
  const { onOpen, renderSignInFormModal } = useSignInFormModal()

  return (
    <chakra.header>
      <Container h={'full'} py={4} bgColor={'blue.800'} height={headerHeight}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Navigate href={(path) => path.$url()}>
            <chakra.a
              _hover={{ opacity: 0.8 }}
              transition={'opacity 0.3s ease-out'}
            >
              <Heading as={'h1'} color={'white'}>
                firebase chat
              </Heading>
            </chakra.a>
          </Navigate>
          <Spacer />
          {isNullish(user) ? (
            <Box>
              <Button colorScheme={'blue'} fontSize={'12px'} onClick={onOpen}>
                ログイン
              </Button>
              {renderSignInFormModal()}
            </Box>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user?.displayName ?? '未設定'}
                  flexShrink={0}
                  size={'sm'}
                />
              </MenuButton>
              <MenuList py={0}>
                <Navigate href={(path) => path.account.$url()}>
                  <MenuItem as={'a'}>アカウント</MenuItem>
                </Navigate>
                <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
