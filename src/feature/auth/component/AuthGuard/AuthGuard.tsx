import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { isUndefined } from '@src/util/isUndefined/isUndefined'
import { isNull } from '@src/util/isNull/isNull'
import type { ReactNode } from 'react'
import { useNavigate } from '@src/hooks/useNavigate/useNavigate'
import { Center, Flex, Spinner, Text } from '@chakra-ui/react'

type Props = Required<{
  children: ReactNode
}>

export const AuthGuard = ({ children }: Props) => {
  const user = useAuthContext()
  const { push } = useNavigate()

  if (isUndefined(user)) {
    return (
      <Center h={'full'} flex={1}>
        <Flex>
          <Spinner />
          <Text ml={2}>認証中</Text>
        </Flex>
      </Center>
    )
  }

  if (isNull(user)) {
    push((path) => path.signin.$url())
    return null
  }

  return <>{children}</>
}
